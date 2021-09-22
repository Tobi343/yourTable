import 'package:concentric_transition/page_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_app/screens/register.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:lottie/lottie.dart';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> with SingleTickerProviderStateMixin {

  final _formKey = GlobalKey<FormState>();

  Color mainColor = Color(0xffF7761E);

  String email ='';
  String password ='';
  String error = '';

  bool loading = false;
  bool obscure = true;

  @override
  Widget build(BuildContext context) {
    return loading ?  WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Center(child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json')),
      ),
    ) :  Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Colors.white,
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
                    padding: EdgeInsets.symmetric(vertical: 20,horizontal: 50),
                    child: Form(
                        key: _formKey,
                        child:Column(
                          children: [
                            //SizedBox(height: 20,),
                            Text("Your Table",style: TextStyle(fontSize: 60,color: mainColor,fontFamily: "PatrickHand"),),
                            SizedBox(height: 20,),
                            Image.asset("lib/assets/orange_logo.png",width: 175,height: 175,),
                            SizedBox(height: 20,),
                            TextFormField(
                              style: TextStyle(color: mainColor),
                              validator: (val) => !val!.contains('@') ? 'Email eingeben' : null,
                              onChanged: (val) {
                                setState(() => email = val);
                              },
                              decoration: InputDecoration(labelText: 'Email', labelStyle: TextStyle(color: mainColor),
                                errorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: BorderSide(color: Colors.red,width: 2),
                                ),
                                focusedErrorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: BorderSide(color: Colors.red,width: 2),
                                ),
                                prefixIcon: Icon(Icons.email_sharp,color: mainColor,),
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
                              style: TextStyle(color: mainColor),
                              obscureText: obscure,
                              validator: (val) => val!.length < 6 ? 'Passwort welches mindestens 6 Zeichen lang ist' : null,
                              onChanged: (val) {
                                setState(() => password = val);
                              },
                              decoration: InputDecoration(labelText: 'Passwort', labelStyle: TextStyle(color: mainColor),
                                focusedErrorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: BorderSide(color: Colors.red,width: 2),
                                ),
                                errorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: BorderSide(color: Colors.red,width: 2),
                                ),
                                prefixIcon: Icon(Icons.lock_sharp,color: mainColor,),
                                suffixIcon: IconButton(
                                  onPressed: (){
                                    setState(() {
                                      obscure = !obscure;
                                    });
                                  },
                                  icon: !obscure ? Icon(Icons.visibility_sharp,color: mainColor,) : Icon(Icons.visibility_off_sharp,color: Colors.grey),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(15),
                                  borderSide: BorderSide(color: mainColor,width: 2),
                                ),
                                enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: mainColor,width: 2), borderRadius: BorderRadius.circular(15),
                                ),
                              ),
                            ),
                            Align(
                              alignment: Alignment.centerRight,
                              child: TextButton(
                                  style: ButtonStyle(
                                    overlayColor: MaterialStateColor.resolveWith((states) => Colors.red.withOpacity(0)),
                                  ),
                                  onPressed: (){
                                    Navigator.push(context, ConcentricPageRoute(builder: (ctx) => Register()));
                                  },
                                  child: RichText(text: TextSpan(
                                    style: TextStyle(
                                      fontSize: 14.0,
                                      color: Colors.grey,
                                    ),
                                    children: [
                                      TextSpan(text: "Keinen Account? "),
                                      TextSpan(text: "Jetzt registrieren",style: TextStyle(color: mainColor,decoration: TextDecoration.underline))
                                    ],
                                  ),
                                  )
                              ),
                            ),
                            ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  primary: mainColor,
                                ),
                                child: Text(
                                  'Einloggen',
                                  style:TextStyle(color: Colors.white,fontSize: 16),
                                ),
                                onPressed: () {
                                  if(_formKey.currentState!.validate()){
                                    setState(() {
                                      loading = true;
                                    });
                                    Future.delayed(const Duration(milliseconds: 8000), () {


                                      setState(() {
                                        loading = false;
                                      });

                                    });
                                  }
                                  else{}

                                }
                            ),
                            SizedBox(height: 12,),
                            Text(error,
                              style: TextStyle(color: Colors.red, fontSize: 16),
                            ),
                            SizedBox(height: 20),
                          ],
                        )
                    )
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
