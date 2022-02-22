import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/main.dart';
import 'package:flutter_app/models/restaurant.dart';
import 'package:flutter_app/screens/edit_userData.dart';
import 'package:flutter_app/screens/home_reservations.dart';
import 'package:flutter_app/screens/restaurant_home.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:animated_search_bar/animated_search_bar.dart';
import 'package:circular_clip_route/circular_clip_route.dart';
import 'package:lottie/lottie.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class MyBehavior extends ScrollBehavior {
  @override
  Widget buildViewportChrome(
      BuildContext context, Widget child, AxisDirection axisDirection) {
    return child;
  }
}

class _HomeScreenState extends State<HomeScreen> {
  static const IconData restaurant = IconData(0xe532, fontFamily: 'MaterialIcons');
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  Color secondColor = Color(0xffF7761E);
  Color mainColor = Colors.white;

  AuthService auth = new AuthService();

  bool loaded = false;

  @override
  void initState() {
    initGetRestaurants();
    super.initState();
  }


  initGetRestaurants() async{
    await auth.getRestaurantData();
    if(mounted){
      setState(() {
        loaded = true;
      });
    }
  }

  Future<bool> showExitPopup() async {
    return await showDialog( //show confirm dialogue
      //the return value will be from "Yes" or "No" options
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: secondColor,
        title: Text('YourTable schließen?',style: TextStyle(color: mainColor),),
        content: Text('Wollen Sie die App schließen?',style: TextStyle(color: mainColor),),
        actions:[
          ElevatedButton(
            style: ElevatedButton.styleFrom(primary: mainColor),
            onPressed: () => Navigator.of(context).pop(false),
            //return false when click on "NO"
            child:Text('NEIN',style: TextStyle(color: secondColor),),
          ),

          ElevatedButton(
            style: ElevatedButton.styleFrom(primary: mainColor),
            onPressed: () {
              SystemNavigator.pop();
              Navigator.of(context).pop(true);
            },
            //return true when click on "Yes"
            child:Text('Ja',style: TextStyle(color: secondColor),),
          ),

        ],
      ),
    )??false; //if showDialouge had returned null, then return false
  }

  final _avatarKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: mainColor,
      appBar: AppBar(
        elevation: 10,
        shadowColor: secondColor,
        toolbarHeight: 65,
        leading: IconButton(
          icon: Icon(restaurant),
          onPressed: () => _scaffoldKey.currentState!.openDrawer(),
        ),
        backgroundColor: secondColor,
        title: Container(
          height: 52,
          child: TextFormField(

            maxLines: 1,
            textInputAction: TextInputAction.search,
            style: TextStyle(color: mainColor),
            textCapitalization: TextCapitalization.sentences,
            cursorColor: mainColor,
            decoration: InputDecoration(
              isDense: true,
              suffixIcon: Icon(Icons.search_sharp, color: mainColor,),
              hintStyle: TextStyle(color: mainColor.withOpacity(0.7)),
              hintText: "Restaurant",labelText: 'Restaurant finden', labelStyle: TextStyle(color: mainColor),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
                borderSide: BorderSide(color: mainColor,width: 2),
              ),
              enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: mainColor,width: 2), borderRadius: BorderRadius.circular(15),
              ),
            ),

            onChanged: (value) {
              //print("value on Change");
              setState(() {
                if(AuthService.fixRestaurants.where((element) => element.restaurantName.toLowerCase().contains(value.toLowerCase())).toList().length > 0)
                  {
                    AuthService.restaurants = AuthService.fixRestaurants.where((element) => element.restaurantName.toLowerCase().contains(value.toLowerCase())).toList();
                  }
                //value = "${value[0].toUpperCase()}${value.substring(1)}";
              });
            }, ),
        ),
      ),
      drawer: Drawer(
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
             DrawerHeader(
              decoration: BoxDecoration(
                color: Color(0xffF7761E),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      FittedBox(fit: BoxFit.fitHeight, child: Icon(Icons.account_circle_sharp,color: mainColor,size: 70,)),
                      Align(
                          alignment: Alignment.topRight,
                          child: FittedBox(
                              fit: BoxFit.fitHeight,
                              child: IconButton(
                                key: _avatarKey,
                                icon: Icon(Icons.edit_sharp),
                                color: mainColor,
                                onPressed: (){
                                  Navigator.push(context, CircularClipRoute<void>(
                                    builder: (_) => EditUserData(),

                                    // This context will be used to determine the location and size of
                                    // the expanding clip. Here this will resolve to the `IconButton`.
                                    expandFrom: _avatarKey.currentContext!,
                                    curve: Curves.fastOutSlowIn,
                                    reverseCurve: Curves.fastOutSlowIn.flipped,
                                    opacity: ConstantTween(1),
                                    transitionDuration: const Duration(seconds: 1),
                                  ));
                                },
                              ))),
                    ],
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 10),
                    child: FittedBox(
                        fit: BoxFit.fitWidth,
                        child: Text(
                          "${AuthService.user["customer_firstname"]} ${AuthService.user["customer_secondname"]}"
                          ,style: TextStyle(color: mainColor, fontWeight: FontWeight.bold),),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 5),
                    child: FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text("${AuthService.email} ",style: TextStyle(color: mainColor, fontWeight: FontWeight.w400),),
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: Icon(Icons.restaurant_menu_sharp,color: secondColor,),
              title: Text("Restaurants",style: TextStyle(fontSize: 16),),
              onTap: () {
                /*
                Navigator.pushReplacement(
                  context,MaterialPageRoute(builder: (context) => Home()),);
                 */
              },
            ),
            ListTile(
              leading: Icon(Icons.featured_play_list_outlined, color: secondColor,),
              title: Text("Reservierungen", style: TextStyle(fontSize: 16),),
              onTap: ()  {
                Navigator.pushReplacement(
                  context,MaterialPageRoute(builder: (context) => Home_Reservations()),);

              },
            ),
            ListTile(
              leading: Icon(Icons.logout_sharp,color: Colors.red,),
              title: Text('Logout',style: TextStyle(fontSize: 16),),
              onTap: ()async {
                final prefs = await SharedPreferences.getInstance();
                prefs.remove('email');
                prefs.remove('jwt');
                setState(() {

                });
                //await _auth.signOut();
                Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (context) => SignIn()),);
                //Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body:loaded == false ? WillPopScope(
        onWillPop: () async => false,
        child: Scaffold(
          backgroundColor: Colors.white,
          body: Center(child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json')),
        ),
      )
          : WillPopScope(
        onWillPop: showExitPopup,
            child: Container(
        child: RefreshIndicator(
            color: mainColor,
            backgroundColor: secondColor,
            onRefresh: ()async{
              setState(() {
                loaded = false;
              });
              await auth.getRestaurantData();
              //print(AuthService.jwToken);
              var x = await auth.getUserData(AuthService.email,"authorization " + AuthService.jwToken);
              setState(() {
                loaded = true;
              });
            },
            child: ScrollConfiguration(
                behavior: MyBehavior(),
                child: ListView.builder(
                  itemCount: AuthService.restaurants.length,
                    itemBuilder: (context, index){
                        return Card(
                          shadowColor: secondColor,
                          margin: EdgeInsets.symmetric(vertical: 10,horizontal: 20),
                          shape: RoundedRectangleBorder(
                            side: BorderSide(color: secondColor, width: 1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          elevation: 7,
                          child: InkWell(
                            splashColor: secondColor,
                            onTap: (){
                              Navigator.push(context, MaterialPageRoute(builder: (context) => RestaurantHome(restaurantIndex: index)),);
                            },
                            child: Container(
                              height: height/4.5,
                              //margin: EdgeInsets.symmetric(vertical: 40),
                              padding: EdgeInsets.only(bottom: 10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Stack(children: [
                                    Container(
                                        width: MediaQuery.of(context).size.width,
                                        height: (height/5)/1.5,
                                        child: ClipRRect(
                                            borderRadius: BorderRadius.only(topLeft: Radius.circular(10),topRight: Radius.circular(10)),
                                            child: CachedNetworkImage(
                                              fit: BoxFit.fitWidth,
                                              imageUrl: AuthService.restaurants[index].restaurantTitlePicture,
                                              placeholder: (context, url) => Container(color: Colors.transparent,),//Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),
                                              errorWidget: (context, url, error) => Icon(Icons.error),
                                            ),
                                            //child: Image.network(AuthService.restaurants[index].restaurantTitlePicture,fit:BoxFit.fitWidth),//Image.asset("lib/assets/restaurantTest.jpg",fit: BoxFit.fitWidth,)
                                        )
                                    ),
                                    Center(
                                      child: Padding(
                                        padding: EdgeInsets.only(top: (height/5)/2.3),
                                        child: CircleAvatar(
                                          backgroundColor: Colors.white,
                                          radius: 25,
                                          child: ClipRRect(
                                            borderRadius:BorderRadius.circular(300),
                                            child: CachedNetworkImage(
                                              fit: BoxFit.fitWidth,
                                              imageUrl: AuthService.restaurants[index].restaurantLogo,
                                              placeholder: (context, url) => Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),//Container(color: Colors.transparent,),
                                              errorWidget: (context, url, error) => Icon(Icons.error),
                                            ),
                                          ),
                                          //child: ClipRRect(borderRadius:BorderRadius.circular(300),child: Image.network(AuthService.restaurants[index].restaurantLogo))//Image.asset("lib/assets/app_icon.png"),
                                        ),
                                      ),
                                    )
                                  ],),
                                  Padding(
                                    padding: EdgeInsets.only(left: 8.0,top: 5),
                                    child: FittedBox(fit: BoxFit.fitWidth, child: Text(AuthService.restaurants[index].restaurantName,style: TextStyle(fontSize: 18),)),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                        return Container(color: Colors.blue,child: Text(AuthService.restaurants[index].restaurantName));
                    }
                ),
            ),
        ),
      ),
          ),
    );
  }
}
