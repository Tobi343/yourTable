import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/create_account.dart';
import 'package:flutter_app/screens/home_screen.dart';
import 'package:flutter_app/screens/register.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp]);
  final prefs = await SharedPreferences.getInstance();
  String email = prefs.getString("email") ?? "";
  String date = prefs.getString("date") ?? "";
  if(date == "") runApp(MyApp());
  else {
    DateTime now = DateTime.now();
    List<String> parts = date.split("-");
    DateTime dateOfLogin = new DateTime(int.parse(parts[0]),int.parse(parts[1]),int.parse(parts[2]));
    Duration diff = now.difference(dateOfLogin);
    if (email == "")
      runApp(MyApp());
    else if (diff.inDays > 12)
      runApp(MyApp());
    else {
      AuthService auth = new AuthService();
      String jwt = prefs.getString("jwt") ?? "";
      AuthService.email = email;
      AuthService.jwToken = jwt;
      jwt = "authorization " + jwt;
      var resp = await auth.getUserData(email, jwt);

      runApp(MaterialApp(
        debugShowCheckedModeBanner: false,
        scrollBehavior: MyBehavior(),
        home: HomeScreen(),)
      );
    }
  }
}

class MyBehavior extends ScrollBehavior {
  @override
  Widget buildViewportChrome(
      BuildContext context, Widget child, AxisDirection axisDirection) {
    return child;
  }
}


class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      scrollBehavior: MyBehavior(),
      home: SignIn(),);
  }
}


