import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthService{

  static const SERVER_IP = 'http://34.139.54.192';
  final storage = FlutterSecureStorage();

  static String email = "";
  static String fistname = "";
  static String lastname = "";
  static Map user = new Map();

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
  
  Future<String?> getUserData(String email, String jwt) async{
    var res = await http.get(
      Uri.parse("$SERVER_IP/users/data/$email"),
      headers: {"authorization": jwt}
    );
    user = json.decode(res.body);
    return res.body;
  }
}