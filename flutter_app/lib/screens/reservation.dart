import 'package:date_picker_timeline/date_picker_widget.dart';
import 'package:day_night_time_picker/lib/constants.dart';
import 'package:day_night_time_picker/lib/daynight_timepicker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
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

  void onTimeChanged(TimeOfDay newTime) {
    setState(() {
      _time = newTime;
    });
  }

  @override
  void initState() {
    informationController = new TextEditingController();
    informationController.text = informationText;
    super.initState();
  }

  @override
  void dispose() {
    informationController.dispose();
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
                  cancelText: "Zurücksetzten",
                  okCancelStyle: TextStyle(color: secondColor),
                  isOnChangeValueMode: false,
                  hourLabel: "Stunde",
                  minuteLabel: "Minute",
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
              child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json'),
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
                      ],
                    ),
                  ),
                ),
              ],
            ),
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
