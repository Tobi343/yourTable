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

  late CameraPosition _initianalCameraPosition;

  @override
  void initState() {
    // TODO: implement initState
    //getRestaurantLocation();
    _initianalCameraPosition = CameraPosition(target: LatLng(AuthService.restaurants[widget.restaurantIndex].lat, AuthService.restaurants[widget.restaurantIndex].long),zoom: 17);
    super.initState();
  }

  getRestaurantLocation()async{
    GeoCode geoCode = GeoCode();

    try {
      Coordinates coordinates = await geoCode.forwardGeocoding(
          address: "532 S Olive St, Los Angeles, CA 90013");

      print("Latitude: ${coordinates.latitude}");
      print("Longitude: ${coordinates.longitude}");
      _initianalCameraPosition = CameraPosition(target: LatLng(coordinates.latitude!, coordinates.longitude!),zoom: 20);
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
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          color: secondColor,
          onPressed: (){
            Navigator.pop(context);
          },
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(children: [
            Container(
                width: MediaQuery.of(context).size.width,
                height: height/3.5,
                child: Image.network(AuthService.restaurants[widget.restaurantIndex].restaurantTitlePicture,fit: BoxFit.fill,),//Image.asset("lib/assets/restaurantTest.jpg",fit: BoxFit.fitWidth,)
            ),
            Center(
              child: Padding(
                padding: EdgeInsets.only(top: height/4.7),
                child: CircleAvatar(
                  backgroundColor: Colors.white,
                  radius: 40,
                  backgroundImage: NetworkImage(AuthService.restaurants[widget.restaurantIndex].restaurantLogo),//Image.asset("lib/assets/app_icon.png"),
                ),
              ),
            )
          ],),
          FittedBox(
          fit: BoxFit.fitWidth,
          child: Padding(
            padding: EdgeInsets.only(top: 5.0, left: 10,bottom:10),
            child: Text(
                AuthService.restaurants[widget.restaurantIndex].restaurantName,
                style: TextStyle(fontSize: 25),
            ),
          )
          ),
          FittedBox(
              fit: BoxFit.fitWidth,
              child: Padding(
                padding: EdgeInsets.only(left: 15,bottom:20, right: 15),
                child: Text(
                  "Adresse: ${AuthService.restaurants[widget.restaurantIndex].restaurantAdress}",
                  style: TextStyle(fontSize: 18),
                ),
              )
          ),
          Center(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(15),
              child: Container(
                width: width - width/6,
                height: height/3,
                child: GoogleMap(
                  myLocationEnabled: true,
                  initialCameraPosition: _initianalCameraPosition,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
