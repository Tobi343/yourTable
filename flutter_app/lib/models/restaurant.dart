import 'package:flutter/material.dart';

class Restaurant{
  int ownerId;
  int restaurantId;
  String restaurantName;
  String restaurantTitlePicture;
  String restaurantLogo;
  double long;
  double lat;
  String restaurantAdress;
  String details;
  List<String> layout = [];

  Restaurant({
    required this.restaurantName,
    required this.restaurantId,
    required this.ownerId,
    required this.restaurantTitlePicture,
    required this.restaurantLogo,
    required this.long,
    required this.lat,
    required this.restaurantAdress,
    required this.details,
    required this.layout
  });

  Restaurant.fromMap(Map map) :
        this.restaurantName = map['restaurant_name'],
        this.restaurantId = map['id'],
        this.ownerId = map['owner_id'],
        this.restaurantTitlePicture = map['restaurant_image'],
        this.restaurantLogo = map['restaurant_logo'],
        this.long = map['restaurant_long'],
        this.lat = map['restaurant_lat'],
        this.restaurantAdress = map["restaurant_address"],
        this.details = map["details"],
        this.layout = map["restaurant_layout"];
  /*
      Map toMap(){
    return{
      'todo': this.todo,
      'check': this.check,
    };
  }

  */

}