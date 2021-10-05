import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthService{

  static const SERVER_IP = 'https://yourtable1.herokuapp.com';
  final storage = FlutterSecureStorage();


  Future<String?> attemptLogIn(String username, String password) async {
    var res = await http.post(
        Uri.parse("$SERVER_IP/users/login"),
        body: {
          "email": username,
          "password": password
        }
    );
    if(res.statusCode == 200) return res.body;
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
}