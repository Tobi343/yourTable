import 'package:flutter/material.dart';

class Restaurant{
  int ownerId;
  int restaurantId;
  String restaurantName;

  Restaurant({
    required this.restaurantName,
    required this.restaurantId,
    required this.ownerId,
  });

  Restaurant.fromMap(Map map) :
        this.restaurantName = map['restaurant_name'],
        this.restaurantId = map['id'],
        this.ownerId = map['owner_id'];


  /*
      Map toMap(){
    return{
      'todo': this.todo,
      'check': this.check,
    };
  }

  */

}