import 'package:date_picker_timeline/date_picker_widget.dart';
import 'package:day_night_time_picker/lib/constants.dart';
import 'package:day_night_time_picker/lib/daynight_timepicker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_app/authenticate/authenticate.dart';
import 'package:flutter_app/models/restaurant.dart';
import 'package:im_stepper/stepper.dart';
import 'package:lottie/lottie.dart';

class Reservation extends StatefulWidget {
  late Restaurant restaurant;

  Reservation({required this.restaurant});


  @override
  _ReservationState createState() => _ReservationState();
}

class _ReservationState extends State<Reservation> {
  AuthService auth = new AuthService();

  Color secondColor = Color(0xffF7761E);
  Color frontColor = Colors.black;

  int activeStep = 0;
  int upperBound = 4;

  int peopleCounter = 2;

  TimeOfDay _time = TimeOfDay.now().replacing(minute: 30);
  bool iosStyle = true;

  DateTime _date = DateTime.now();

  late TextEditingController informationController;
  String informationText = "";

  bool childChair = false;
  bool dog = false;
  bool birthday = false;

  late final TextEditingController _emailController;
  late String email;
  late final TextEditingController _numberController;
  late String phone;


  void onTimeChanged(TimeOfDay newTime) {
    setState(() {
      _time = TimeOfDay.now().replacing(minute: 30);
      if(_time.hour+2 >23){
        int time = (_time.hour +2)-24;
        _time = new TimeOfDay(hour: time, minute: _time.minute);
      }
      else _time = new TimeOfDay(hour: _time.hour+2, minute: _time.minute);
      double toDoubleTime = _time.hour+0;
      double toDoubleNew = newTime.hour+0;
      if(toDoubleNew >= toDoubleTime && _date.day == DateTime.now().day && _date.month == DateTime.now().month && _date.year == DateTime.now().year) _time = newTime;
      else if(_date.day != DateTime.now().day || _date.month != DateTime.now().month || _date.year != DateTime.now().year) _time = newTime;
      else{
        showDialog<String>(
          context: context,
          builder: (BuildContext context) => AlertDialog(
            backgroundColor: secondColor,
            title: const Text('Ungültige Zeit!',style: TextStyle(color: Colors.white),),
            content: const Text('Bitte geben Sie eine gültige Zeit für die Reservierung ein. Die Zeit muss mindestens 2 Stunden nach der jetzigen Zeit liegen.',style: TextStyle(color: Colors.white),),
            actions: <Widget>[
              ElevatedButton(
                style: ElevatedButton.styleFrom(primary: Colors.white),
                onPressed: () => Navigator.pop(context, 'OK'),
                child: Text('OK',style: TextStyle(color: secondColor),),
              ),
            ],
          ),
        );
      }
      print(_time);
    });
  }

  @override
  void initState() {
    if(_time.hour+2 >23){
      int time = (_time.hour +2)-24;
      _time = new TimeOfDay(hour: time, minute: _time.minute);
    }
    else _time = new TimeOfDay(hour: _time.hour+2, minute: _time.minute);
    informationController = new TextEditingController();
    informationController.text = informationText;
    _emailController = new TextEditingController();
    _emailController.text = AuthService.user["customer_email"].toString();
    email = _emailController.text;
    _numberController = new TextEditingController();
    _numberController.text = AuthService.user["customer_phone"].toString();
    phone = _numberController.text;
    super.initState();
  }

  @override
  void dispose() {
    informationController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: secondColor,
        centerTitle: true,
        title: Text("Tischreservierung"),
      ),
      body: GestureDetector(
        onTap: (){
          FocusScopeNode currentFocus = FocusScope.of(context);
          if (!currentFocus.hasPrimaryFocus) {
            currentFocus.unfocus();
          }
        },
        child: Column(
          children: [
            IconStepper(
              lineLength: 75,
              scrollingDisabled: false,
              enableNextPreviousButtons: false,
              enableStepTapping: false,
              stepReachedAnimationEffect: Curves.linearToEaseOut,
              activeStepColor: secondColor,
              activeStepBorderColor: secondColor,
              icons: [
                Icon(Icons.people_alt_sharp),
                Icon(Icons.access_alarm),
                Icon(Icons.restaurant_menu_sharp),
                Icon(Icons.info_outline_rounded),
                Icon(Icons.done_sharp)
              ],

              // activeStep property set to activeStep variable defined above.
              activeStep: activeStep,

              // This ensures step-tapping updates the activeStep.
              onStepReached: (index) {
                setState(() {
                  activeStep = index;
                });
              },
            ),
            reservationBody(),
            Padding(
              padding: const EdgeInsets.only(bottom: 20.0,right: 20,left: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  previousButton(),
                  nextButton(),
                ],
              ),
            ),
          ],

        ),
      ),
    );
  }

  Widget reservationBody(){
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    switch(activeStep){
      case 0:
        return Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Container(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  SizedBox(height: height/15,),
                  Container(
                        child: Lottie.asset('lib/assets/monkey.json',fit: BoxFit.scaleDown),
                        height: height/3.5,
                  ),
                  SizedBox(height: height/30,),
                  Material(
                    elevation: 20,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    child: Container(
                      margin: EdgeInsets.all(10),
                      child: Column(
                        children: [
                          Container(child: FittedBox(child: Text("Für wie viele Personen wird reserviert?",style: TextStyle(color: Colors.black,fontSize: 22),))),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              IconButton(
                                  iconSize: 30,
                                  splashColor: Colors.transparent,
                                  highlightColor: Colors.transparent,
                                  color: Colors.black,
                                  onPressed: (){
                                    setState(() {
                                      if(peopleCounter > 1) peopleCounter--;
                                    });
                                  },
                                  icon: Icon(Icons.remove_circle_outline_sharp)
                              ),
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 20),
                                child: Text("$peopleCounter",style: TextStyle(color: Colors.black,fontSize: 22),),
                              ),
                              IconButton(
                                  iconSize: 30,
                                  splashColor: Colors.transparent,
                                  highlightColor: Colors.transparent,
                                  color: Colors.black,
                                  onPressed: (){
                                    setState(() {
                                      peopleCounter++;
                                    });
                                  },
                                  icon: Icon(Icons.add_circle_outline_sharp)
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      case 1:
        return Expanded(
          child: ListView(
            children: [Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Material(
                  borderRadius: BorderRadius.all(Radius.circular(30)),
                  elevation: 20,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                        borderRadius: BorderRadius.all(Radius.circular(30))
                    ),
                    padding: EdgeInsets.all(10),
                    child: FittedBox(
                      fit: BoxFit.fitWidth,
                      child: Text("Datum und Uhrzeit",style: TextStyle(fontSize: 22,color: secondColor)),
                    ),
                  ),
                ),
                SizedBox(height: 10,),
                Material(
                  elevation: 20,
                  child: Container(
                    color: Colors.white,
                    child: DatePicker(
                      DateTime.now(),
                      height: height/9,
                      locale: "de",
                      initialSelectedDate: _date,
                      selectionColor: secondColor,
                      selectedTextColor: Colors.white,
                      onDateChange: (date) {
                        // New date selected
                        setState(() {
                          _date = date;
                        });
                      },
                    ),
                  ),
                ),
                createInlinePicker(
                  elevation: 20,
                  barrierColor: secondColor,
                  okText: "Speichern",
                  cancelText: "",
                  okStyle: TextStyle(color: secondColor),
                  isOnChangeValueMode: false,
                  hourLabel: "Stunde",
                  minuteLabel: "Minute",
                  minHour: 8,
                  maxHour: 22,
                  accentColor: secondColor,
                    minuteInterval: MinuteInterval.FIFTEEN,
                    maxMinute: 50,
                    is24HrFormat: true,
                    iosStylePicker: true,
                    context: context,
                    value: _time,
                    onChange: onTimeChanged,
                    displayHeader: true
                ),
              ],
            )],
          ),
        );
      case 2:
        return Expanded(
            child: Container(
              child: Container(
                height: widget.restaurant.layout[0][0]["height"]*1.0,
                width: widget.restaurant.layout[0][0]["width"]*1.0,
                color: secondColor,
              )//Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),
            ),
        );
      case 3:
        return Expanded(
            child: ListView(
              //mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                    padding: EdgeInsets.symmetric(horizontal: 15,vertical: 10),
                  child: Material(
                    elevation: 20,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    child: ExpansionTile(
                      textColor: Colors.black,
                      title: Text("Information:",style: TextStyle(fontSize: 20),),
                      subtitle: Text("Teilen Sie uns ihre Wünsche mit"),
                      children: [
                        SizedBox(height: 5,),
                        TextFormField(
                          controller: informationController,
                          onChanged: (value){
                            setState(() {
                              informationText = value;
                            });
                          },
                          maxLines: null,
                          keyboardType: TextInputType.text,
                          textInputAction: TextInputAction.done,
                          style: TextStyle(color: Colors.black),
                          decoration: InputDecoration(labelText: 'Ihr Anliegen', labelStyle: TextStyle(color: secondColor),
                            //prefixIcon: Icon(Icons.email_sharp,color: secondColor,),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                              borderSide: BorderSide(color: secondColor,width: 2),
                            ),
                            enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: secondColor,width: 2), borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        )

                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15,vertical: 10),
                  child: Material(
                    elevation: 20,
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    child: ExpansionTile(
                      textColor: Colors.black,
                        title: Text("Extras:",style: TextStyle(fontSize: 20),),
                      subtitle: Text("Wählen Sie aus zahlreichen Optionen aus"),
                      children: [
                        InkWell(
                              child: Container(
                                child: Row(
                                  children: [
                                    Text("Kinderstuhl"),
                                    Checkbox(
                                      activeColor: secondColor,
                                        value: childChair,
                                        onChanged: (value){
                                          setState(() {
                                            childChair = value!;
                                          });
                                        }
                                    ),
                                  ],
                                ),
                                padding: EdgeInsets.all(5),
                              ),
                              onTap: (){
                                setState(() {
                                  childChair = !childChair;
                                });
                              },
                            ),
                        InkWell(
                              child: Container(
                                child: Row(
                                  children: [
                                    Text("Hund"),
                                    Checkbox(
                                        activeColor: secondColor,
                                        value: dog,
                                        onChanged: (value){
                                          setState(() {
                                            dog = value!;
                                          });
                                        }
                                    ),
                                  ],
                                ),
                                padding: EdgeInsets.all(5),
                              ),
                              onTap: (){
                                setState(() {
                                  dog = !dog;
                                });
                              },
                            ),
                        InkWell(
                          child: Container(
                            child: Row(
                              children: [
                                Text("Geburtstagsessen"),
                                Checkbox(
                                    activeColor: secondColor,
                                    value: birthday,
                                    onChanged: (value){
                                      setState(() {
                                        birthday = value!;
                                      });
                                    }
                                ),
                              ],
                            ),
                            padding: EdgeInsets.all(5),
                          ),
                          onTap: (){
                            setState(() {
                              birthday = !birthday;
                            });
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
        );
      case 4:
        return Expanded(
            child: ListView(
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Material(
                        borderRadius: BorderRadius.all(Radius.circular(30)),
                        elevation: 20,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(30))
                          ),
                          padding: EdgeInsets.all(10),
                          child: FittedBox(
                            fit: BoxFit.fitWidth,
                            child: Text("Reservierung",style: TextStyle(fontSize: 22,color: secondColor)),
                          ),
                        ),
                      ),
                      SizedBox(height: 25,),
                      Material(
                        borderRadius: BorderRadius.all(Radius.circular(15)),
                        elevation: 20,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(15))
                          ),
                          padding: EdgeInsets.all(10),
                          child: Padding(
                            padding: EdgeInsets.only(top: 0),
                            child: TextFormField(
                              controller: _emailController,
                              inputFormatters: [
                                new LengthLimitingTextInputFormatter(30),
                              ],
                              style: TextStyle(color: frontColor),
                              validator: (val) => !val!.contains('@') ? 'Email eingeben' : null,
                              onChanged: (val) {
                                setState(() => email = val);
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
                          ),

                        ),
                      ),
                      SizedBox(height: 25,),
                      Material(
                        borderRadius: BorderRadius.all(Radius.circular(15)),
                        elevation: 20,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(15))
                          ),
                          padding: EdgeInsets.all(10),
                          child: Padding(
                            padding: EdgeInsets.only(top: 0),
                            child: TextFormField(
                              keyboardType: TextInputType.phone,
                              controller: _numberController,
                              inputFormatters: [
                                new LengthLimitingTextInputFormatter(30),
                              ],
                              style: TextStyle(color: frontColor),
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

                        ),
                      ),
                      SizedBox(height: 25,),
                      Material(
                        borderRadius: BorderRadius.all(Radius.circular(15)),
                        elevation: 20,
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(15))
                          ),
                          padding: EdgeInsets.all(10),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text("Restaurant: ${widget.restaurant.restaurantName}",style: TextStyle(fontSize: 18,color: frontColor),),
                              SizedBox(height: 10,),
                              FittedBox(
                                fit: BoxFit.fitWidth,
                                child: Text("Anzahl der Personen: $peopleCounter",style: TextStyle(fontSize: 18, color: frontColor),),
                              ),
                              SizedBox(height: 10,),
                              FittedBox(
                                fit: BoxFit.fitWidth,
                                child: Text("Datum und Uhrzeit: ${_date.day}.${_date.month}.${_date.year}, ${_time.format(context)}",style: TextStyle(fontSize: 18, color: frontColor),),
                              ),
                              SizedBox(height: 10,),
                              informationText.length == 0 ? Container() : Text("Ihr Anliegen: $informationText",style: TextStyle(fontSize: 18,color: frontColor),),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 25,),
                      ElevatedButton(
                          onPressed: (){},
                          style: ElevatedButton.styleFrom(
                            primary: secondColor,
                            elevation: 20
                          ),
                          child: Text("Reservieren",style: TextStyle(fontSize: 16),)
                      )
                    ],
                  ),
                ),
              ],
            )
        );
      default:
        return Expanded(child: Container());
  }
  }

  Widget nextButton() {
    if(activeStep != upperBound) return Material(
      elevation: 20,
      color: Colors.transparent,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: secondColor,
        ),
        onPressed: () {
          // Increment activeStep, when the next button is tapped. However, check for upper bound.
          if (activeStep < upperBound) {
            setState(() {
              print(_time);
              activeStep++;
            });
          }
        },
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Text('Weiter'),
        ),
      ),
    );
    else return Container();
  }

  /// Returns the previous button.
  Widget previousButton() {
    if(activeStep > 0) return Material(
      elevation: 20,
      color: Colors.transparent,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: secondColor,
        ),
        onPressed: () {
          // Decrement activeStep, when the previous button is tapped. However, check for lower bound i.e., must be greater than 0.
          if (activeStep > 0) {
            setState(() {
              activeStep--;
            });
          }
        },
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Text('Zurück'),
        ),
      ),
    );
    else return Container();
  }
}
