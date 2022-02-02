import 'dart:ffi';

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
      jwToken = res.body;
      final prefs = await SharedPreferences.getInstance();
      prefs.setString("email", username);
      prefs.setString("jwt", jwToken);
      DateTime now = DateTime.now();
      String dateOfLogin = "${now.year}-${now.month}-${now.day}";
      print(dateOfLogin);
      prefs.setString("date", dateOfLogin);
      return res.body;
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
    user = json.decode(res.body);
    return res.body;

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

}