import 'package:concentric_transition/page_route.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/screens/sign_in.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {

  final _formKey = GlobalKey<FormState>();

  Color mainColor = Colors.white;

  String email ='';
  String password ='';
  String error = '';

  bool loading = false;
  bool obscure = true;

  
  @override
  Widget build(BuildContext context) {
    return loading ? Container(
      color: Color(0xffF7761E),
      child: SpinKitFadingCircle(
        color: mainColor,
        size: 50.0,
      ),
    ) : Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Color(0xffF7761E),
      body: GestureDetector(
        onTap: (){
          FocusScopeNode currentFocus = FocusScope.of(context);
          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.unfocus();
          }
        },
        child: SingleChildScrollView(
          child: Stack(
            children: <Widget>[
              Container(
                  padding: EdgeInsets.symmetric(vertical: 20,horizontal: 50),
                  child: Form(
                      key: _formKey,
                      child:Column(
                        children: [
                          SizedBox(height: 50,),
                          Text("YourTable",style: TextStyle(fontSize: 60,color: mainColor,fontFamily: "PatrickHand"),),
                          SizedBox(height: 20,),
                          Image.asset("lib/assets/white_logo.png",width: 200,height: 200,),
                          SizedBox(height: 20,),
                          TextFormField(
                            style: TextStyle(color: mainColor),
                            validator: (val) => val!.isEmpty ? 'Enter an Email' : null,
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
                            validator: (val) => val!.length < 6 ? 'Enter a Password 6+ characters long' : null,
                            obscureText: obscure,
                            onChanged: (val) {
                              setState(() => password = val);
                            },
                            decoration: InputDecoration(labelText: 'Password', labelStyle: TextStyle(color: mainColor),
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
                                icon: !obscure ? Icon(Icons.visibility_sharp,color: mainColor,) : Icon(Icons.visibility_off_sharp,color: Colors.grey[600]),
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
                                onPressed: (){
                                  Navigator.pop(context);
                                  },
                                child: RichText(text: TextSpan(
                                  style: TextStyle(
                                    fontSize: 14.0,
                                    color: Colors.grey[600],
                                  ),
                                  children: [
                                    TextSpan(text: "Already have an Account? "),
                                    TextSpan(text: "Sign in",style: TextStyle(color: mainColor,decoration: TextDecoration.underline,))
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
                                'Register',
                                style:TextStyle(color: Color(0xffF7761E),fontSize: 16),
                              ),
                              onPressed: () {

                              }
                          ),
                          SizedBox(height: 12,),
                          Text(error,
                            style: TextStyle(color: Colors.red, fontSize: 16),
                          )
                        ],
                      )
                  )
              )
            ],
          ),
        ),
      ),
    );
  }
}
