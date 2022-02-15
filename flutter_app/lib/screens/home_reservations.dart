import 'package:circular_clip_route/circular_clip_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/home_screen.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:lottie/lottie.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'edit_userData.dart';


class Home_Reservations extends StatefulWidget {
  const Home_Reservations({Key? key}) : super(key: key);

  @override
  _Home_ReservationsState createState() => _Home_ReservationsState();
}

class _Home_ReservationsState extends State<Home_Reservations> {

  static const IconData restaurant = IconData(0xe532, fontFamily: 'MaterialIcons');
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  Color secondColor = Color(0xffF7761E);
  Color mainColor = Colors.white;

  AuthService auth = new AuthService();

  final _avatarKey = GlobalKey();

  bool loaded = false;

  initGetReservations() async{
    await auth.getReservations();
    setState(() {
      loaded = true;
    });
  }

  @override
  void initState() {
    initGetReservations();
    super.initState();
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

  String getDate(String s){
    var parts = s.split("-");
    return "${parts[2].substring(0,2)}.${parts[1]}.${parts[0]}";
  }
  
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        elevation: 10,
        shadowColor: secondColor,
        toolbarHeight: 65,
        leading: IconButton(
          icon: Icon(restaurant),
          onPressed: () => _scaffoldKey.currentState!.openDrawer(),
        ),
        backgroundColor: secondColor,
        title: Text("Meine Reservierungen"),
        centerTitle: true,
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

                Navigator.pushReplacement(
                  context,MaterialPageRoute(builder: (context) => HomeScreen()),);

              },
            ),
            ListTile(
              leading: Icon(Icons.featured_play_list_outlined, color: secondColor,),
              title: Text("Reservierungen", style: TextStyle(fontSize: 16),),
              onTap: () async {

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
      body: loaded == false ? WillPopScope(
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
              await auth.getReservations();
              //print(AuthService.jwToken);
              var x = await auth.getUserData(AuthService.email,"authorization " + AuthService.jwToken);
              setState(() {
                loaded = true;
              });
            },
            child: ScrollConfiguration(
              behavior: MyBehavior(),
              child:AuthService.reservations.length > 0 ? ListView.builder(
                  itemCount: AuthService.reservations.length,
                  itemBuilder: (context, index){
                    if(AuthService.user["customer_id"] == AuthService.reservations[index]["customer_id"])
                      {
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
                              print(AuthService.user);
                              String qrCode = "${AuthService.user["customer_firstname"]} ${AuthService.user["customer_secondname"]}\nDatum und Uhrzeit: ${getDate(AuthService.reservations[index]["reservation_date"])} um ${AuthService.reservations[index]["reservation_time"]}\nPlatz: ${AuthService.reservations[index]["reservation_table"]}";

                              showDialog<String>(
                                  context: context,
                                  builder: (BuildContext context) => AlertDialog(
                                backgroundColor: secondColor,
                                content: Container(
                                  height: height/3,
                                  width: width/3,
                                  child: Center(
                                    child: QrImage(
                                      data: qrCode,
                                      gapless: false,
                                      version: QrVersions.auto,
                                    ),
                                  ),
                                ),
                                actions: <Widget>[
                                  Center(
                                    child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(primary: Colors.white),
                                      onPressed: () => Navigator.pop(context, 'OK'),
                                      child: Text('OK',style: TextStyle(color: secondColor),),
                                    ),
                                  ),
                                ],
                              ),
                              );
                              //Navigator.push(context, MaterialPageRoute(builder: (context) => RestaurantHome(restaurantIndex: index)),);
                            },
                            child: Container(
                              height: height/5.5,
                              //margin: EdgeInsets.symmetric(vertical: 40),
                              padding: EdgeInsets.symmetric(vertical: 5),
                              child: Padding(
                                padding: const EdgeInsets.only(left: 10,right: 10),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    FittedBox(fit: BoxFit.fitHeight,child: Text("Datum: ${getDate(AuthService.reservations[index]["reservation_date"])}",style: TextStyle(fontSize: 16),)),
                                    FittedBox(fit: BoxFit.fitHeight,child: Text("Uhrzeit: ${AuthService.reservations[index]["reservation_time"]}",style: TextStyle(fontSize: 16),)),
                                    FittedBox(fit: BoxFit.fitHeight,child: Text("Tisch: ${AuthService.reservations[index]["reservation_table"]}",style: TextStyle(fontSize: 16),)),
                                    FittedBox(fit: BoxFit.fitHeight,child: Text("Personen: ${AuthService.reservations[index]["reservation_personcount"]}",style: TextStyle(fontSize: 16),)),
                                    Stack(
                                      children: [
                                        Text("Anmerkung: ${AuthService.reservations[index]["reservation_extra"] != "" ? AuthService.reservations[index]["reservation_extra"] : "Keine Angabe"}",style: TextStyle(fontSize: 16),overflow: TextOverflow.ellipsis,),
                                        Align(
                                          alignment: Alignment.bottomRight,
                                          child: IconButton(
                                              onPressed: () async {
                                                setState(() {
                                                  loaded = false;
                                                });
                                                var resp = await auth.deleteReservation(AuthService.reservations[index]["restaurant_id"], AuthService.user["customer_id"], AuthService.reservations[index]["reservation_time"], AuthService.reservations[index]["reservation_date"]);
                                                print(resp);
                                                await auth.getReservations();
                                                setState(() {
                                                  loaded = true;
                                                });
                                              },
                                              icon: Icon(Icons.delete_sharp,color: Colors.red,)
                                          ),
                                        )
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      }
                    else return Container();
                  }
              )
                  : Center(child:
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Lottie.asset('lib/assets/moon.json',height: height/4),
                      SizedBox(height: 5,),
                      FittedBox(fit: BoxFit.fitWidth, child: Text("Keine Reservierungen vorhanden",style: TextStyle(fontSize: 20),))
                    ],
                  )),
            ),
          ),
        ),
      )
    );
  }
}
