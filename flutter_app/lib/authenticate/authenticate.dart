import 'dart:ffi';

import 'package:day_night_time_picker/lib/state/time.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/models/restaurant.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class AuthService{

  static const SERVER_IP = 'http://34.139.40.48';
  final storage = FlutterSecureStorage();

  static String email = "Email";
  static String fistname = "Name";
  static String lastname = "Nachname";
  static String jwToken = "";
  static Map<String,dynamic> user = new Map();
  static List<dynamic> restaurantsJSON = [];
  static List<Restaurant> restaurants = [];
  static List<Restaurant> fixRestaurants = [];
  static List<dynamic> reservations = [];
  static var reservationsTime;


  Future<String?> attemptLogIn(String username, String password) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/users/login"),
        body: {
          "email": username,
          "password": password
        }
    );
    if(res.statusCode == 200) {
      print("test");
      email = username;
      var body = json.decode(res.body);
      print(body);
      jwToken = body["token"];
      print(jwToken);
      final prefs = await SharedPreferences.getInstance();
      prefs.setString("email", username);
      prefs.setString("jwt", jwToken);
      DateTime now = DateTime.now();
      String dateOfLogin = "${now.year}-${now.month}-${now.day}";
      print(dateOfLogin);
      prefs.setString("date", dateOfLogin);
      return jwToken;
    }
    return null;
  }

  Future<int> attemptSignUp(String username, String password) async {
    var res = await http.post(
        Uri.parse('$SERVER_IP/users/register'),
        body: {
          "email": username,
          "password": password
        }
    );
    return res.statusCode;

  }
  
  Future<String?> getRestaurantData() async{
    var res = await http.get(
      Uri.parse("$SERVER_IP/Restaurant"),
    );
    restaurantsJSON = json.decode(res.body);
    //print(restaurantsJSON);
    //restaurants = restaurantsJSON[0].map((item) => Restaurant.fromMap(json.decode(item))).toList();
    //print(restaurants[0]);
    restaurants = [];
    fixRestaurants = [];
    for (var o in restaurantsJSON) {
      List<dynamic> tables = json.decode(o["restaurant_layout"]);
      var r = new Restaurant(layout: tables, restaurantName: o["restaurant_name"], restaurantId: o["id"], ownerId: o["owner_id"],restaurantLogo: o["restaurant_logo"],restaurantTitlePicture: o["restaurant_image"],lat: double.parse(o["restaurant_lat"]), long: double.parse(o["restaurant_long"]),restaurantAdress: o["restaurant_address"],details: o["details"]);
      restaurants.add(r);
      fixRestaurants.add(r);
    }
    //print(restaurants[0].restaurantName);
    return res.body;
  }

  Future<String?> getUserData(String email, String jwt) async{
    var res = await http.get(
        Uri.parse("$SERVER_IP/users/data/$email"),
        headers: {"authorization": jwt}
    );
    print(res.body);
    user = json.decode(res.body);
    return res.body;

  }

  Future<String?> getReservations() async {
    var res = await http.get(
        Uri.parse("$SERVER_IP/reservation/${AuthService.user["customer_id"]}"),
    );
    print(res.body);
    reservations = json.decode(res.body);
    return res.body;
  }

  Future<int?> deleteReservation(int restaurantId, int userId, String reservationTime, String reservationDate) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/reservation/delete"),
        body: {
          "restaurant_id": restaurantId.toString(),
          "customer_id": userId.toString(),
          "reservation_time": reservationTime.toString(),
          "reservation_date": reservationDate.toString()
        }
    );
    //print(res.statusCode);
    return res.statusCode;
  }

  Future<int?> writeUserData(String wfirstname, String wlastname, String wphone) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/users/data/updateUserData"),
        body: {
          "firstName": wfirstname,
          "lastName": wlastname,
          "phone": wphone,
          "email": email
        }
    );
    //print(res.statusCode);
    return res.statusCode;
  }

  Future<int?> writeReservation(int restaurantId, int userId, String reservationTime, String reservationDate, int tableNumber, int roomNumber, String extra, int personNumber, ) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/reservation"),
        body: {
          "restaurant_id": restaurantId.toString(),
          "customer_id": userId.toString(),
          "reservation_time": reservationTime,
          "reservation_date": reservationDate,
          "reservation_table": tableNumber.toString(),
          "reservation_room": roomNumber.toString(),
          "reservation_extra": extra,
          "reservation_personCount": personNumber.toString(),
          "reservation_chatid": "null"
        }
    );
    return res.statusCode;
  }

  Future<dynamic> getReservationsTimeOfTable(int restaurantID, DateTime date) async {
    var te = date.toString().split(" ");
    var res = await http.get(
        Uri.parse("$SERVER_IP/reservations/${restaurantID}"),
        headers: {"reservationDate": te[0]}
    );
    if(res.statusCode == 201){
      reservationsTime = jsonDecode(res.body);
    }
    else if(res.statusCode == 405) reservationsTime = [];
    return res.body;
  }

  Future<dynamic> getRestaurantComments(int restaurantID) async {
    var res = await http.get(
        Uri.parse("$SERVER_IP/comments/${restaurantID}"),
    );
    if(res.statusCode == 201){
      return res.body;
    }
    else return [];
  }

  Future<int?> writeComment(int restaurantId, int userId, String comment, String date, int stars, String title) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/comments/${restaurantId}"),
        body: {
          "customer_id": userId.toString(),
          "_comment": comment,
          "_date": date,
          "stars": stars.toString(),
          "title": title
        }
    );
    return res.statusCode;
  }

}