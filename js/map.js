// Initialize and add the map
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // 기본 위치 (예: 대한민국 중심)
  const defaultPosition = { lat: 36.5, lng: 127.5 }; // 대한민국 중간 정도 좌표

  map = new Map(document.getElementById("map"), {
    zoom: 7,
    center: defaultPosition,
    mapId: "DEMO_MAP_ID",
  });

  let marker;

  map.addListener("click", (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // 기존 마커 제거
    if (marker) {
      marker.setMap(null);
    }

    // 새로운 마커 생성
    marker = new AdvancedMarkerElement({
      map: map,
      position: clickedLatLng,
      title: "선택된 위치",
    });

    // Save the latitude and longitude to local storage
    localStorage.setItem("clickedLocation", JSON.stringify(clickedLatLng));
    console.log("Location saved to local storage:", clickedLatLng);

    // Show the 'next' button
    document.getElementById('next-button').style.display = 'block';
  });
}

// 초기 상태에서 '다음으로 이동' 버튼 숨기기
document.getElementById('next-button').style.display = 'none';

initMap();

// '다음으로 이동' 버튼 클릭 이벤트
document.getElementById('next-button').addEventListener('click', function() {
  // Navigate to the second screen (travel info input screen)
  window.location.href = 'main-info.html';
});