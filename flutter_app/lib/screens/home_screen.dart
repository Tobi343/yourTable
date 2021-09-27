import 'package:flutter/material.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:animated_search_bar/animated_search_bar.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const IconData restaurant = IconData(0xe532, fontFamily: 'MaterialIcons');
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  Color secondColor = Color(0xffF7761E);
  Color mainColor = Colors.white;

  @override
  Widget build(BuildContext context) {
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
                              child: IconButton( icon: Icon(Icons.edit_sharp),
                                  color: mainColor,
                                onPressed: (){},
                              ))),
                    ],
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 10),
                    child: FittedBox(
                        fit: BoxFit.fitWidth,
                        child: Text('Tobias Breffler',style: TextStyle(color: mainColor, fontWeight: FontWeight.bold),),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 5),
                    child: FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text('tobias.breffler@gmail.com',style: TextStyle(color: mainColor, fontWeight: FontWeight.w400),),
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
      body: Container(),
    );
  }
}
