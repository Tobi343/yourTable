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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: secondColor,
        centerTitle: true,
        title: Text("Tischreservierung"),
      ),
      body: Column(
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
            padding: const EdgeInsets.all(20.0),
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
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(height: height/15,),
                Container(
                    child: Lottie.asset('lib/assets/monkey.json',fit: BoxFit.scaleDown),
                    height: height/3.5,
                ),
                SizedBox(height: height/30,),
                FittedBox(child: Text("Für wie viele Personen wird reserviert?",style: TextStyle(color: Colors.black,fontSize: 22),)),
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
        );
      default:
        return Expanded(child: Container());
  }
  }

  Widget nextButton() {
    if(activeStep != upperBound) return ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: secondColor,
      ),
      onPressed: () {
        // Increment activeStep, when the next button is tapped. However, check for upper bound.
        if (activeStep < upperBound) {
          setState(() {
            activeStep++;
          });
        }
      },
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Text('Weiter'),
      ),
    );
    else return Container();
  }

  /// Returns the previous button.
  Widget previousButton() {
    if(activeStep > 0) return ElevatedButton(
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
    );
    else return Container();
  }
}
