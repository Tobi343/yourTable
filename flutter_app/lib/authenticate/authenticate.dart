import 'package:flutter_app/models/restaurant.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthService{

  static const SERVER_IP = 'http://34.139.54.192';
  final storage = FlutterSecureStorage();

  static String email = "Email";
  static String fistname = "Name";
  static String lastname = "Nachname";
  static String jwToken = "";
  static Map<String,dynamic> user = new Map();
  static List<dynamic> restaurantsJSON = [];
  static List<Restaurant> restaurants = [];

  Future<String?> attemptLogIn(String username, String password) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/users/login"),
        body: {
          "email": username,
          "password": password
        }
    );
    if(res.statusCode == 200) {
      email = username;
      jwToken = res.body;
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
    restaurants = restaurantsJSON.map((item) => Restaurant.fromMap(json.decode(item))).toList();
    //print(restaurants[0]);
    print(restaurants[0]);
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