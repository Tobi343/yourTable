import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/screens/home_screen.dart';
import 'package:lottie/lottie.dart';

class EditUserData extends StatefulWidget {
  const EditUserData({Key? key}) : super(key: key);

  @override
  _EditUserDataState createState() => _EditUserDataState();
}

class _EditUserDataState extends State<EditUserData> {
  static const IconData person = IconData(0xe491, fontFamily: 'MaterialIcons');
  AuthService auth = new AuthService();

  final _formKey = GlobalKey<FormState>();

  late String firstname;
  late String lastname;
  late String phone;

  String error = "";

  bool loading = false;

  Color secondColor = Color(0xffF7761E);
  Color mainColor = Colors.white;

  late final TextEditingController _firstnameController;
  late final TextEditingController _lastnameController;
  //late final TextEditingController _emailController;
  late final TextEditingController _numberController;


  @override
  void initState() {
    _firstnameController = new TextEditingController();
    _firstnameController.text = AuthService.user["customer_firstname"].toString();
    _lastnameController = new TextEditingController();
    _lastnameController.text = AuthService.user["customer_secondname"].toString();
    //_emailController = new TextEditingController();
    //_emailController.text = AuthService.user["customer_email"].toString();
    _numberController = new TextEditingController();
    _numberController.text = AuthService.user["customer_phone"].toString();
    firstname = _firstnameController.text;
    lastname = _lastnameController.text;
    phone = _numberController.text;
    super.initState();
  }

  @override
  void dispose() {
    _firstnameController.dispose();
    _lastnameController.dispose();
    //_emailController.dispose();
    _numberController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return loading ?  WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        backgroundColor: Color(0xffF7761E),
        body: Center(child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json')),
      ),
    ) :  Scaffold(
      backgroundColor: mainColor,
      appBar: AppBar(
        elevation: 0,
        centerTitle: true,
        title: FittedBox(fit: BoxFit.fitWidth, child: Text("${AuthService.user["customer_firstname"]} ${AuthService.user["customer_secondname"]}")),
        backgroundColor: secondColor,
      ),
      body: GestureDetector(
        onTap: (){
          FocusScopeNode currentFocus = FocusScope.of(context);
          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.unfocus();
          }
        },
        child: SingleChildScrollView(
          child: Container(
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 0),
                    child: Lottie.asset('lib/assets/dancing_burger.json',height: 200,),
                    //Icon(Icons.account_circle_sharp,color: secondColor,size: 100,),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 30,left: 40,right: 40),
                    child: TextFormField(
                      controller: _firstnameController,
                      inputFormatters: [
                        new LengthLimitingTextInputFormatter(30),
                      ],
                      style: TextStyle(color: secondColor),
                      validator: (val) => val!.isEmpty ? 'Vorname eingeben' : null,
                      onChanged: (val) {
                        setState(() => firstname = val);
                      },
                      decoration: InputDecoration(labelText: 'Vorname', labelStyle: TextStyle(color: secondColor),
                        errorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        focusedErrorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        prefixIcon: Icon(Icons.account_box_sharp,color: secondColor,),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: secondColor,width: 2),
                        ),
                        enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: secondColor,width: 2), borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 30,left: 40,right: 40),
                    child: TextFormField(
                      controller: _lastnameController,
                      inputFormatters: [
                        new LengthLimitingTextInputFormatter(30),
                      ],
                      style: TextStyle(color: secondColor),
                      validator: (val) => val!.isEmpty ? 'Nachname eingeben' : null,
                      onChanged: (val) {
                        setState(() => lastname = val);
                      },
                      decoration: InputDecoration(labelText: 'Nachname', labelStyle: TextStyle(color: secondColor),
                        errorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        focusedErrorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        prefixIcon: Icon(Icons.person,color: secondColor,),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: secondColor,width: 2),
                        ),
                        enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: secondColor,width: 2), borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                    ),
                  ),
                  /*Padding(
                    padding: EdgeInsets.only(top: 30,left: 40,right: 40),
                    child: TextFormField(
                      controller: _emailController,
                      inputFormatters: [
                        new LengthLimitingTextInputFormatter(30),
                      ],
                      style: TextStyle(color: secondColor),
                      validator: (val) => !val!.contains('@') ? 'Email eingeben' : null,
                      onChanged: (val) {
                        setState(() => _emailController.text = val);
                      },
                      decoration: InputDecoration(labelText: 'Email', labelStyle: TextStyle(color: secondColor),
                        errorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        focusedErrorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        prefixIcon: Icon(Icons.email_sharp,color: secondColor,),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: secondColor,width: 2),
                        ),
                        enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: secondColor,width: 2), borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                    ),
                  ),*/
                  Padding(
                    padding: EdgeInsets.only(top: 30,left: 40,right: 40,bottom: 40),
                    child: TextFormField(
                      keyboardType: TextInputType.phone,
                      controller: _numberController,
                      inputFormatters: [
                        new LengthLimitingTextInputFormatter(30),
                      ],
                      style: TextStyle(color: secondColor),
                      validator: (val) => val!.isEmpty ? 'Handynummer eingeben' : null,
                      onChanged: (val) {
                        setState(() => phone = val);
                      },
                      decoration: InputDecoration(labelText: 'Handynummer', labelStyle: TextStyle(color: secondColor),
                        errorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        focusedErrorBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: Colors.red,width: 2),
                        ),
                        prefixIcon: Icon(Icons.phone_android_sharp,color: secondColor,),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15),
                          borderSide: BorderSide(color: secondColor,width: 2),
                        ),
                        enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: secondColor,width: 2), borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 15,top: 0),
                    child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: secondColor,
                        ),
                        child: Text(
                          'Speichern',
                          style:TextStyle(color: mainColor,fontSize: 16),
                        ),
                        onPressed: () async {

                          if(_formKey.currentState!.validate()){
                            setState(() {
                              loading=true;
                            });
                            //print(firstname);
                            int? statusCode = await auth.writeUserData(firstname, lastname, phone);
                            if(statusCode != null && statusCode != 201) {
                              error = "Speichern fehlgeschlagen!";
                              setState(() {
                                loading = false;
                              });
                            }
                            else{
                              String jwt = "authorization " + AuthService.jwToken;
                              var resp = await auth.getUserData(AuthService.email, jwt);
                              //print(resp);
                              error = "";
                              Navigator.pop(context);
                              Navigator.of(context)
                                  .pushAndRemoveUntil(
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          HomeScreen()), (Route<dynamic> route) => false);
                            }
                          }
                          else{
                          }
                        }
                    ),
                  ),
                  SizedBox(height: 12,),
                  Text(error,
                    style: TextStyle(color: Colors.red, fontSize: 16),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
