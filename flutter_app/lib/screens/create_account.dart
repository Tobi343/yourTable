import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:lottie/lottie.dart';

import 'home_screen.dart';

class CreateAccount extends StatefulWidget {
  late final String email;
  late final String pw;

  CreateAccount({required this.email, required this.pw});

  @override
  _CreateAccountState createState() => _CreateAccountState();
}

class _CreateAccountState extends State<CreateAccount> {

  AuthService auth = new AuthService();

  Color mainColor = Colors.white;

  final _formKey = GlobalKey<FormState>();
  String error = '';
  String firstName = '';
  String lastName = '';
  String number = '';

  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return loading ? WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        backgroundColor: Color(0xffF7761E),
        body: Center(child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json')),
      ),
    ) : WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        backgroundColor: Color(0xffF7761E),
        body: GestureDetector(
          onTap: (){
            FocusScopeNode currentFocus = FocusScope.of(context);
            if (!currentFocus.hasPrimaryFocus) {
              currentFocus.unfocus();
            }
          },
          child: Center(
            child: SingleChildScrollView(
              child: Stack(
                children: <Widget>[
                  Container(
                      padding: EdgeInsets.symmetric(vertical: 20,horizontal: 40),
                      child: Form(
                          key: _formKey,
                          child:Column(
                              children: [
                                //Text("Your Table",style: TextStyle(fontSize: 60,color: mainColor,fontFamily: "PatrickHand"),),
                                Lottie.asset('lib/assets/astronaut.json'),
                                TextFormField(
                                  inputFormatters: [
                                    new LengthLimitingTextInputFormatter(30),
                                  ],
                                  style: TextStyle(color: mainColor),
                                  validator: (val) => val!.isEmpty ? 'Vorname eingeben' : null,
                                  onChanged: (val) {
                                    setState(() => firstName = val);
                                  },
                                  decoration: InputDecoration(labelText: 'Vorname', labelStyle: TextStyle(color: mainColor),
                                    errorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    prefixIcon: Icon(Icons.account_circle_sharp,color: mainColor,),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: mainColor,width: 2),
                                    ),
                                    enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: mainColor,width: 2), borderRadius: BorderRadius.circular(15),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 20,),
                                TextFormField(
                                  inputFormatters: [
                                    new LengthLimitingTextInputFormatter(30),
                                  ],
                                  style: TextStyle(color: mainColor),
                                  validator: (val) => val!.isEmpty ? 'Nachname eingeben' : null,
                                  onChanged: (val) {
                                    setState(() => lastName = val);
                                  },
                                  decoration: InputDecoration(labelText: 'Nachname', labelStyle: TextStyle(color: mainColor),
                                    errorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    prefixIcon: Icon(Icons.account_circle_outlined,color: mainColor,),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: mainColor,width: 2),
                                    ),
                                    enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: mainColor,width: 2), borderRadius: BorderRadius.circular(15),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 20),
                                TextFormField(
                                  inputFormatters: [
                                    new LengthLimitingTextInputFormatter(30),
                                  ],
                                  style: TextStyle(color: mainColor),
                                  validator: (val) => val!.isEmpty ? 'Handynummer eingeben' : null,
                                  onChanged: (val) {
                                    setState(() => number = val);
                                  },
                                  decoration: InputDecoration(labelText: 'Handynummer', labelStyle: TextStyle(color: mainColor),
                                    errorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    focusedErrorBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: Colors.red,width: 2),
                                    ),
                                    prefixIcon: Icon(Icons.phone_android_sharp,color: mainColor,),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(15),
                                      borderSide: BorderSide(color: mainColor,width: 2),
                                    ),
                                    enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: mainColor,width: 2), borderRadius: BorderRadius.circular(15),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 20),
                                TextButton(
                                    style: ButtonStyle(
                                      overlayColor: MaterialStateColor.resolveWith((states) => Colors.white.withOpacity(0)),
                                      backgroundColor: MaterialStateColor.resolveWith((states) => Colors.white),
                                    ),
                                    child: Text(
                                      'Starten!',
                                      style:TextStyle(color: Color(0xffF7761E),fontSize: 16),
                                    ),
                                    /*child: Lottie.asset(
                                        'lib/assets/rocket.json',
                                      height: 100,
                                      width: 100
                                    ),*/
                                    onPressed: () async {
                                      if(_formKey.currentState!.validate()){
                                        setState(() {
                                          loading = true;
                                        });

                                        var jwt = await auth.attemptLogIn(widget.email, widget.pw);
                                        //print(jwt);
                                        if(jwt == null || jwt == "null") {
                                          setState(() {
                                            error = "Einloggen fehlgeschlagen!";
                                            loading = false;
                                          });
                                        }
                                        else {
                                          int? statusCode = await auth.writeUserData(firstName, lastName, number);
                                          if(statusCode != null && statusCode != 201){
                                            error = "Einloggen fehlgeschlagen!";
                                            setState(() {
                                              loading = false;
                                            });
                                          }
                                          else{
                                            jwt = "authorization " + jwt;
                                            var resp = await auth.getUserData(widget.email, jwt);
                                            //print(resp);
                                            error = "";
                                            Navigator.of(context)
                                                .pushAndRemoveUntil(
                                                MaterialPageRoute(
                                                    builder: (context) =>
                                                        HomeScreen()), (
                                                Route<dynamic> route) => false);
                                            setState(() {
                                              Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => HomeScreen()));
                                              //Navigator.pushReplacement(context, MaterialPageRoute(builder: (ctx) => CreateAccount()));
                                              //loading = false;
                                            });
                                          }
                                        }


                                      }
                                      else{}
                                    }
                                ),
                                SizedBox(height: 12,),
                                Text(error,
                                  style: TextStyle(color: Colors.red[700], fontSize: 16),
                                ),
                              ],
                            ),
                          )
                      )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
