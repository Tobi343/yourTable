import 'package:flutter/material.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/edit_userData.dart';
import 'package:flutter_app/screens/restaurant_home.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:animated_search_bar/animated_search_bar.dart';
import 'package:circular_clip_route/circular_clip_route.dart';
import 'package:lottie/lottie.dart';

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
    setState(() {
      loaded = true;
    });
  }

  final _avatarKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: mainColor,
      appBar: AppBar(
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
              print("value on Change");
              setState(() {
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
              onTap: () {/*
                Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (context) => NotesHome()),);*/
              },
            ),
            ListTile(
              leading: Icon(Icons.logout_sharp,color: Colors.red,),
              title: Text('Logout',style: TextStyle(fontSize: 16),),
              onTap: ()async {
                setState(() {
                  //loading = true;
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
          : Container(
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
                                        child: Image.network(AuthService.restaurants[index].restaurantTitlePicture),//Image.asset("lib/assets/restaurantTest.jpg",fit: BoxFit.fitWidth,)
                                    )
                                ),
                                Center(
                                  child: Padding(
                                    padding: EdgeInsets.only(top: (height/5)/2.3),
                                    child: CircleAvatar(
                                      radius: 25,
                                      child: Image.network(AuthService.restaurants[index].restaurantLogo)//Image.asset("lib/assets/app_icon.png"),
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
    );
  }
}
