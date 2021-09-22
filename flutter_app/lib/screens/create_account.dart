import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CreateAccount extends StatefulWidget {
  @override
  _CreateAccountState createState() => _CreateAccountState();
}

class _CreateAccountState extends State<CreateAccount> {

  Color mainColor = Colors.white;

  final _formKey = GlobalKey<FormState>();
  String error = '';
  String firstName = '';
  String lastName = '';
  String number = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                    padding: EdgeInsets.symmetric(vertical: 20,horizontal: 50),
                    child: Form(
                        key: _formKey,
                        child:Column(
                            children: [
                              FittedBox(fit: BoxFit.fitWidth, child: Text("Account Daten",style: TextStyle(fontSize: 50,color: mainColor,fontFamily: "PatrickHand"),)),
                              SizedBox(height: 20,),
                              TextFormField(
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
                              ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    primary: mainColor,
                                  ),
                                  child: Text(
                                    'Create',
                                    style:TextStyle(color: Color(0xffF7761E),fontSize: 16),
                                  ),
                                  onPressed: () {

                                  }
                              ),
                              SizedBox(height: 12,),
                              Text(error,
                                style: TextStyle(color: Colors.red, fontSize: 16),
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
    );
  }
}
