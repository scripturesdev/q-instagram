function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("position", position);
      //      getCityAndCountry(position);
    },
    (err) => {
      console.log("err:", err);
    },
    { timeout: 7000 } // if cant get location then timeout
  );
}
