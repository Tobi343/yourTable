import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:geocode/geocode.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class RestaurantHome extends StatefulWidget {

  late int restaurantIndex;

  RestaurantHome({required this.restaurantIndex});

  @override
  _RestaurantHomeState createState() => _RestaurantHomeState();
}

class _RestaurantHomeState extends State<RestaurantHome> {

  Color secondColor = Color(0xffF7761E);

  AuthService auth = new AuthService();

  CameraPosition _initianalCameraPosition = CameraPosition(target: LatLng(48.210033, 16.363449),zoom: 15);

  @override
  void initState() {
    // TODO: implement initState
    //getRestaurantLocation();
    super.initState();
  }

  getRestaurantLocation()async{
    GeoCode geoCode = GeoCode();

    try {
      Coordinates coordinates = await geoCode.forwardGeocoding(
          address: "532 S Olive St, Los Angeles, CA 90013");

      print("Latitude: ${coordinates.latitude}");
      print("Longitude: ${coordinates.longitude}");
      _initianalCameraPosition = CameraPosition(target: LatLng(coordinates.latitude!, coordinates.longitude!),zoom: 15);
      print(_initianalCameraPosition.target);
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

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
                  radius: 40,
                  child: Image.asset("lib/assets/app_icon.png"),
                ),
              ),
            )
          ],),
          FittedBox(
          fit: BoxFit.fitWidth,
          child: Padding(
            padding: EdgeInsets.only(top: 5.0, left: 8,bottom:20),
            child: Text(
                AuthService.restaurants[widget.restaurantIndex].restaurantName,
                style: TextStyle(fontSize: 25),
            ),
          )
          ),
          Center(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(30)
              ),
              width: width - width/6,
              height: height/3,
              child: GoogleMap(
                myLocationEnabled: true,
                initialCameraPosition: _initianalCameraPosition,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
