import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '@goongmaps/goong-js/dist/goong-js.css';
import polyline from '@mapbox/polyline';
import goongjs from '@goongmaps/goong-js';
import "./Booking.css";
import goongIoService from '../../services/goongIoService';

const MapComponent = () => {
    const origin = useSelector(state => state.map.origin);
    const destination = useSelector(state => state.map.destination);


    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Đặt token truy cập cho Goong Maps
        goongjs.accessToken = process.env.REACT_APP_API_KEY_MAP_GOONGIO;

        // Khởi tạo bản đồ nếu chưa có
        if (!mapRef.current) {
            mapRef.current = new goongjs.Map({
                container: mapContainer.current,
                style: 'https://tiles.goong.io/assets/goong_map_web.json',
                center: [106.1157, 11.3064], // Tọa độ trung tâm của Tây Ninh
                zoom: 11.5
            });
            console.log("Map has been initialized");
        }
    }, []); // Chỉ chạy một lần khi component được mount

    function haversineDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Bán kính Trái Đất tính bằng km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Khoảng cách tính bằng km
        return 2*Math.floor(distance);
    }
   
    useEffect(() => {
        const map = mapRef.current;

        const updateMap = async () => {
            if (origin && destination) {
        
                const distance = haversineDistance(
                    parseFloat(origin.split(',')[0]), // Latitude của `origin`
                    parseFloat(origin.split(',')[1]), // Longitude của `origin`
                    parseFloat(destination.split(',')[0]), // Latitude của `destination`
                    parseFloat(destination.split(',')[1])  // Longitude của `destination`
                );          

                // Tính toán trung bình của latitude và longitude
                const avgLat = (parseFloat(origin.split(',')[0]) + parseFloat(destination.split(',')[0])) / 2;
                const avgLng = (parseFloat(origin.split(',')[1]) + parseFloat(destination.split(',')[1])) / 2;
                
      

                // Điều chỉnh giá trị để đảm bảo chúng nằm trong phạm vi hợp lệ
                const adjustedLat = Math.max(-90, Math.min(90, avgLat));
                const adjustedLng = Math.max(-180, Math.min(180, avgLng));

                if (distance < 20){
                    map.jumpTo({ center: [adjustedLng, adjustedLat], zoom: 11.5 });
                }
                else if (distance >= 20 && distance <50){
                    map.jumpTo({ center: [adjustedLng, adjustedLat], zoom: 10});
                }
                else if (distance <100 && distance >= 50){
                    map.jumpTo({ center: [adjustedLng, adjustedLat], zoom: 7 });
                }
                else if (distance >= 100) {
                    map.jumpTo({ center: [adjustedLng, adjustedLat], zoom: 4 });
                }
                // Nhảy đến vị trí trung bình
               

                try {
                    // Fetch dữ liệu chỉ dẫn từ goongIoService
                    const data = await goongIoService.fetchDirections(origin, destination);

                    if (data) {
                        console.log('Directions response:', data);

                        // Lấy thông tin route từ phản hồi
                        const route = data.routes[0];

                        if (!route) {
                            console.error('No route found');
                            return;
                        }

                        const geometry_string = route.overview_polyline.points;
                        const geoJSON = polyline.toGeoJSON(geometry_string);
                        console.log('GeoJSON:', geoJSON);

                        // Xóa route cũ nếu có
                        if (map.getSource('route')) {
                            map.removeLayer('route');
                            map.removeSource('route');
                        }

                        // Thêm source và layer vào bản đồ
                        map.addSource('route', {
                            type: 'geojson',
                            data: geoJSON
                        });

                        map.addLayer({
                            id: 'route',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            paint: {
                                'line-color': '#1e88e5',
                                'line-width': 8
                            }
                        });

                        console.log('Route added to map');
                    } else {
                        console.error('Failed to fetch directions');
                    }
                } catch (error) {
                    console.error('Error fetching directions:', error);
                }
            } else {
                console.log("Origin or destination is missing");
            }
        };

        // Cập nhật bản đồ mỗi khi origin hoặc destination thay đổi
        updateMap();

    }, [origin, destination]); // Theo dõi sự thay đổi của origin và destination

    return (
        <div width="100%" height="auto" className="Gmap">
            <div className="maps"
                style={{
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                    height: "100%",
                }}>
                <div ref={mapContainer}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        border: 0,
                        borderRadius: "20px",
                        width: "100%",
                        height: "100%"
                    }}>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
