const fakePostInfo = {
  // content, image, likesDish, userID -> user.username, dishId -> dishes.name, likes
  post: [
    {
      dishid: 'Sandwiches',
      userid: 'Anna',
      image: 'https://www.aiche.org/sites/default/files/images/conference/event/1200-dietitian-lunch-wide-sandwich.jpg',
      content: 'This was a great lunch',
      likesDish: 'likes',
      likes: 8,
    },
    {
      dishid: 'Mac n Cheese',
      userid: 'Lory',
      image: 'https://static1.squarespace.com/static/515ecaf0e4b0875140cb8775/59a6ebc715d5dbf2569d69fc/59a6ec1ff9a61e863f312fd1/1504111648572/cheesy+spatzle-2.jpg?format=2500w',
      content: 'Cheesy mcCheese',
      likesDish: 'likes',
      likes: 9,
    },
    {
      dishid: 'Cookie cereal',
      userid: 'David',
      image: 'https://static1.squarespace.com/static/515ecaf0e4b0875140cb8775/5a3abf3e0d9297e5adc2d82e/5a3ac15c24a694af280afcde/1513800031398/new+years+cookie+cereal-15.jpg?format=2500w',
      content: 'Cookies in cereal',
      likesDish: 'likes',
      likes: 5,
    },
  ],
};

export default fakePostInfo;
