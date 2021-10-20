import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthService{

  static const SERVER_IP = 'http://34.139.54.192';
  final storage = FlutterSecureStorage();

  String username = "";

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
  
  Future<String?> getUserData(String email, String jwt) async{
    var res = await http.get(
      Uri.parse("$SERVER_IP/users/data/$email"),
      headers: {"authorization": jwt}
    );
    return res.body;
  }
}