import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/reservation.dart';
import 'package:geocode/geocode.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:rate_in_stars/rate_in_stars.dart';
import 'package:lottie/lottie.dart';

class RestaurantHome extends StatefulWidget {

  late int restaurantIndex;

  RestaurantHome({required this.restaurantIndex});

  @override
  _RestaurantHomeState createState() => _RestaurantHomeState();
}

class MyBehavior extends ScrollBehavior {
  @override
  Widget buildViewportChrome(
      BuildContext context, Widget child, AxisDirection axisDirection) {
    return child;
  }
}


class _RestaurantHomeState extends State<RestaurantHome> {

  Color secondColor = Color(0xffF7761E);

  AuthService auth = new AuthService();

  late CameraPosition _initianalCameraPosition;
  List<dynamic> comments = [];

  @override
  void initState() {
    // TODO: implement initState
    //getRestaurantLocation();
    getRestaurantComments();
    _initianalCameraPosition = CameraPosition(target: LatLng(AuthService.restaurants[widget.restaurantIndex].lat, AuthService.restaurants[widget.restaurantIndex].long),zoom: 18);
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

  void getRestaurantComments() async {
    var test = await auth.getRestaurantComments(AuthService.restaurants[widget.restaurantIndex].restaurantId);
    setState(() {
    });
    print(test);
    comments = jsonDecode(test);
  }

  List<Widget> displayComments(double w){
    List<Widget> com = [];
    print(comments.length);
    for(int i = 0; i< comments.length;i++){
      com.add(
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Material(
              borderRadius: BorderRadius.all(Radius.circular(15)),
              elevation: 20,
              child: Container(
                width: w,
                padding: EdgeInsets.all(10),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text(comments[i]["title"],style: TextStyle(fontWeight: FontWeight.bold,fontSize: 16,decoration: TextDecoration.underline),),
                    ),
                    RatingStars(
                      editable: false,
                      rating: comments[i]["stars"]+0.0,
                      color: Colors.amber,
                      iconSize: 24,
                    ),
                    FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text(comments[i]["_comment"],style: TextStyle(fontSize: 16),),
                    ),
                    Align(
                      alignment: Alignment.bottomRight,
                      child: FittedBox(
                        fit: BoxFit.fitWidth,
                        child: Text(comments[i]["_date"],style: TextStyle(fontSize: 16),),
                      ),
                    ),
                  ],
                ),
              )
            ),
          ),
      );
    }
    return com;
  }

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Scaffold(
      extendBodyBehindAppBar: true,
      //backgroundColor: secondColor,
      /*
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

       */
      body: ScrollConfiguration(
        behavior: MyBehavior(),
        child: ListView(
          //physics: NeverScrollableScrollPhysics(),
          children:[
            Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(children: [
                Container(
                    width: MediaQuery.of(context).size.width,
                    height: height/3.5,
                  child: CachedNetworkImage(
                    fit: BoxFit.fill,
                    imageUrl: AuthService.restaurants[widget.restaurantIndex].restaurantTitlePicture,
                    placeholder: (context, url) => Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),//Container(color: Colors.transparent,),
                    errorWidget: (context, url, error) => Icon(Icons.error),
                  ),
                  //child: Image.network(AuthService.restaurants[widget.restaurantIndex].restaurantTitlePicture,fit: BoxFit.fill,),//Image.asset("lib/assets/restaurantTest.jpg",fit: BoxFit.fitWidth,)
                ),
                Center(
                  child: Padding(
                    padding: EdgeInsets.only(top: height/4.7),
                    child: CircleAvatar(
                      backgroundColor: Colors.white,
                      radius: 40,
                      child: ClipRRect(
                        borderRadius:BorderRadius.circular(300),
                        child: CachedNetworkImage(
                          fit: BoxFit.fitWidth,
                          imageUrl: AuthService.restaurants[widget.restaurantIndex].restaurantLogo,
                          placeholder: (context, url) => Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),//Container(color: Colors.transparent,),
                          errorWidget: (context, url, error) => Icon(Icons.error),
                        ),
                      ),
                      //child: ClipRRect(borderRadius:BorderRadius.circular(300),child: Image.network(AuthService.restaurants[widget.restaurantIndex].restaurantLogo))//Image.asset("lib/assets/app_icon.png"),
                      //backgroundImage: NetworkImage(AuthService.restaurants[widget.restaurantIndex].restaurantLogo),//Image.asset("lib/assets/app_icon.png"),
                    ),
                  ),
                ),
                IconButton(onPressed: () => Navigator.pop(context), icon: Icon(Icons.arrow_back_sharp,color: secondColor,)),
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
              Padding(
                padding: EdgeInsets.only(top: 5.0, left: 10,bottom:0,right: 10),
                child: Text(AuthService.restaurants[widget.restaurantIndex].details),
              ),
              Divider(
                thickness: 1.5,
                  color: secondColor
              ),
              FittedBox(
                  fit: BoxFit.fitWidth,
                  child: Padding(
                    padding: EdgeInsets.only(left: 10,right: 10),
                    child: Text(
                      "Adresse:",
                      style: TextStyle(fontSize: 20),
                    ),
                  )
              ),
              FittedBox(
                  fit: BoxFit.fitWidth,
                  child: Padding(
                    padding: EdgeInsets.only(left: 10,bottom:10, right: 10),
                    child: Text(
                      "${AuthService.restaurants[widget.restaurantIndex].restaurantAdress}",
                      style: TextStyle(fontSize: 18),
                    ),
                  )
              ),
              Center(
                  child: Container(
                    decoration: BoxDecoration(
                        border: Border.all(color: secondColor)
                    ),
                    width: width - width/6,
                    height: height/3,
                    child: GoogleMap(
                      gestureRecognizers: Set()..add(Factory<EagerGestureRecognizer>(() => EagerGestureRecognizer())),
                      myLocationEnabled: true,
                      initialCameraPosition: _initianalCameraPosition,
                    ),
                  ),
                ),
              Column(
                children: displayComments(width),
              ),
              SizedBox(height: 100,)
            ],
          )],
        ),
      ),
      floatingActionButton: Container(
        margin: EdgeInsets.all(10),
        width: width/6.2,
        height: height/13,
        child: FloatingActionButton(
          isExtended: true,
          backgroundColor: secondColor,
          child: Image.asset("lib/assets/table.png",height: height/10.5,width: width/10.5,color: Colors.white,),
          onPressed: (){
            Navigator.of(context).push(MaterialPageRoute(builder: (context) => Reservation(restaurant: AuthService.restaurants[widget.restaurantIndex])));
          },
        ),
      ),
    );
  }
}
