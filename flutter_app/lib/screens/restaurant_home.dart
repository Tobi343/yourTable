import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/authenticate/authenticate.dart';

class RestaurantHome extends StatefulWidget {

  late int restaurantIndex;

  RestaurantHome({required this.restaurantIndex});

  @override
  _RestaurantHomeState createState() => _RestaurantHomeState();
}

class _RestaurantHomeState extends State<RestaurantHome> {

  Color secondColor = Color(0xffF7761E);

  AuthService auth = new AuthService();



  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      extendBodyBehindAppBar: true,
      //backgroundColor: secondColor,
      appBar: AppBar(
        elevation: 0,
        //title: Text(AuthService.restaurants[widget.restaurantIndex].restaurantName),
        backgroundColor: Colors.transparent,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(children: [
            Container(
                width: MediaQuery.of(context).size.width,
                height: height/3.5,
                child: Image.asset("lib/assets/restaurantTest.jpg",fit: BoxFit.fitWidth,)
            ),
            Center(
              child: Padding(
                padding: EdgeInsets.only(top: height/4.7),
                child: CircleAvatar(
                  radius: 50,
                  child: Image.asset("lib/assets/app_icon.png"),
                ),
              ),
            )
          ],),
          FittedBox(
          fit: BoxFit.fitWidth,
          child: Text(
              AuthService.restaurants[widget.restaurantIndex].restaurantName,
              style: TextStyle(fontSize: 25),
          )
          ),
        ],
      ),
    );
  }
}
