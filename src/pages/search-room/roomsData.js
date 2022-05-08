function getRundomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRoomData() {
  const roomNum = getRundomNum(100, 1000);
  const price = getRundomNum(0, 100) * 100;
  const countOfReviews = getRundomNum(0, 100);
  const raiting = getRundomNum(0, 6);
  const roomType = getRundomNum(0, 2) ? "люкс" : "стандартный";

  return {
    roomNum,
    price,
    countOfReviews,
    raiting,
    roomType,
    imgs: [roomType ? "../assets/luxury_room.png" : "../assets/standart_room.png"],
  };
}

export default generateRoomData;
