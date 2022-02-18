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

  bool loaded = false;

  Color secondColor = Color(0xffF7761E);
  Color frontColor = Colors.black;

  int activeStep = 0;
  int upperBound = 4;

  int peopleCounter = 2;

  TimeOfDay _time = TimeOfDay.now().replacing(minute: 30);
  bool iosStyle = true;

  DateTime _date = DateTime.now();
  DateTime d = DateTime.now();

  late TextEditingController informationController;
  String informationText = "";

  bool childChair = false;
  bool dog = false;
  bool birthday = false;

  late final TextEditingController _emailController;
  late String email;
  late final TextEditingController _numberController;
  late String phone;

  int roomNumber = 0;
  int selectedTableRoomNumber = -1;
  int selectedTableNumber = -1;

  void onTimeChanged(TimeOfDay newTime) {
    setState(() {
      _time = TimeOfDay.now().replacing(minute: 30);
      double toDoubleTime = _time.hour+2;
      double toDoubleNew = newTime.hour+0;
      if(_time.hour+2 >23){
        int time = (_time.hour +2)-24;
        _time = new TimeOfDay(hour: time, minute: _time.minute);
      }
      else _time = new TimeOfDay(hour: _time.hour+2, minute: _time.minute);
      if(toDoubleNew >= toDoubleTime && _date.day == DateTime.now().day && _date.month == DateTime.now().month && _date.year == DateTime.now().year) _time = newTime;
      else if(_date.isAfter(DateTime.now()) && (_date.day != DateTime.now().day || _date.month != DateTime.now().month || _date.year != DateTime.now().year)) _time = newTime;
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
    });
  }

  @override
  void initState() {
    getReservationsTime();
    peopleCounter = 2;
    if(_time.hour+2 >23){
      int time = (_time.hour +2)-24;
      _time = new TimeOfDay(hour: time, minute: _time.minute);
      _date = _date.add(new Duration(days: 1));
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

  void getReservationsTime() async{
    await auth.getReservationsTimeOfTable(widget.restaurant.restaurantId, _date);
    print(AuthService.reservationsTime["1"]["2"][0]);
  }

  int getNumberofRooms(){
    //print(widget.restaurant.layout[0]["Arr"][0]["key"]);
    //print(widget.restaurant.layout[0]["Arr"].length);
    int number = 0;
    for(int i = 0; i < widget.restaurant.layout.length;i++) {
      if (widget.restaurant.layout[i]["Arr"].length > 0) number++;
    }
    return number;
  }

  List<Container> roomPicker(){
    //var t = auth.getReservationsTimeOfTable(widget.restaurant.restaurantId, _date);
    //print(t);
    List<Container> rooms = [];
    for(int i = 0; i< getNumberofRooms();i++){
      rooms.add(
        Container(
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: secondColor,
              side: i == roomNumber ? BorderSide(width: 2, color: Colors.black) : BorderSide(width: 0)
            ),
            onPressed: (){
              setState(() {
                roomNumber = i;
              });
            },
            child: Text("${widget.restaurant.layout[i]["Name"]}"),
          )
        )
      );
    }
    //selectedTableRoomNumber = 0;
    return rooms;
  }

  List<Container> createTables(int i){
    //print(widget.restaurant.layout[i]["Arr"].length);
    //print(roomNumber);
    List<Container> tables = [];
    //tables.add(Container());
    //for(int i = 0; i < widget.restaurant.layout.length;i++) {
      //if (widget.restaurant.layout[i].length > 0) {
        //print(AuthService.reservationsTime[(i+1).toString()][2.toString()]);
        for (int j = 0; j < widget.restaurant.layout[i]["Arr"].length; j++) {
          bool open = true;
          if(AuthService.reservationsTime.length != 0 && AuthService.reservationsTime[(i).toString()] != null && AuthService.reservationsTime[(i).toString()][widget.restaurant.layout[i]["Arr"][j]["key"].toString()] != null){
            for(int k = 0; k<AuthService.reservationsTime[(i).toString()][widget.restaurant.layout[i]["Arr"][j]["key"].toString()].length;k++){
              TimeOfDay t = new TimeOfDay(hour: int.parse(AuthService.reservationsTime[(i).toString()][widget.restaurant.layout[i]["Arr"][j]["key"].toString()][k]["reservation_time"].substring(0,2)),minute: int.parse(AuthService.reservationsTime[(i).toString()][widget.restaurant.layout[i]["Arr"][j]["key"].toString()][k]["reservation_time"].substring(3,5)));
              double tBefore = t.hour-2 + t.minute/60.0;
              double tAfter = t.hour+2 + t.minute/60.0;
              double tt = _time.hour + _time.minute/60.0;
              print(tt);
              print(tBefore);
              print(tAfter);
              if(tt>=tBefore && tt<= tAfter)open = false;
              //if(!(tBefore > tt) || !(tAfter < tt))open = false;
            }
          }
          tables.add(
              Container(
                margin: EdgeInsets.only(top: widget.restaurant.layout[i]["Arr"][j]["y"]*0.5,left: widget.restaurant.layout[i]["Arr"][j]["x"]*0.5),
                height: widget.restaurant.layout[i]["Arr"][j]["height"]*0.5,
                width: widget.restaurant.layout[i]["Arr"][j]["width"]*0.5,
                color: secondColor,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: open ? secondColor : Colors.grey[700],
                    side: open && selectedTableRoomNumber == roomNumber && selectedTableNumber == widget.restaurant.layout[i]["Arr"][j]["key"] ? BorderSide(
                      width: 2,
                      color: Colors.black
                    ) : BorderSide(
                      width: 0
                    ),
                  ),
                  onPressed: (){
                    setState(() {
                      if(open && !(selectedTableRoomNumber == roomNumber && selectedTableNumber == widget.restaurant.layout[i]["Arr"][j]["key"])) {
                        selectedTableRoomNumber = roomNumber;
                        selectedTableNumber = widget.restaurant.layout[i]["Arr"][j]["key"];
                      }
                      else if(open){
                        selectedTableRoomNumber = -1;
                        selectedTableNumber = -1;
                      }
                    });
                  },
                  child: Center(child: Text("${widget.restaurant.layout[i]["Arr"][j]["key"]}",textAlign: TextAlign.center,)),
                )//Center(child: Text("${widget.restaurant.layout[i][j]["key"]}",style: TextStyle(color: Colors.white),)),
          ));
        }
      //}
    //}
    return tables;
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
      body: loaded == true ? WillPopScope(
        onWillPop: () async => false,
        child: Scaffold(
          backgroundColor: Colors.white,
          body: Center(child: Lottie.asset('lib/assets/fast-food-mobile-app-loading.json')),
        ),
      ) : GestureDetector(
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
                      d,
                      height: height/9,
                      locale: "de",
                      initialSelectedDate: _date,
                      selectionColor: secondColor,
                      selectedTextColor: Colors.white,
                      onDateChange: (date) async {
                        // New date selected
                        setState(() {
                          _date = date;
                        });
                        getReservationsTime();
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
        return Flexible(
            child: Column(
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
                      child: Text("Tischauswahl",style: TextStyle(fontSize: 22,color: secondColor)),
                    ),
                  ),
                ),
                SizedBox(height: 25,),
                Wrap(
                  spacing: 5,
                  children: roomPicker(),
                ),
                SizedBox(height: 10,),
                Container(
                  height: height/2,
                  width: width - 30,
                  color: Colors.grey[400],
                  child: Stack(
                    alignment: Alignment.topLeft,
                    children: createTables(roomNumber),
                  ),
                ),
                Expanded(child: Container())
              ],
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
                              FittedBox(
                                fit: BoxFit.fitWidth,
                                child: selectedTableNumber > 0 ? Text("Reservierter Tisch: ${widget.restaurant.layout[selectedTableRoomNumber]["Name"]}, Tisch ${selectedTableNumber}",style: TextStyle(fontSize: 18, color: frontColor),) : null,
                              ),
                              SizedBox(height: 10,),
                              informationText.length == 0 ? Container() : Text("Ihr Anliegen: $informationText",style: TextStyle(fontSize: 18,color: frontColor),),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 25,),
                      ElevatedButton(
                          onPressed: () async {
                            if(selectedTableNumber > -1 && selectedTableRoomNumber > -1){
                              print(peopleCounter.toString());
                              String time = "${_time.hour}:${_time.minute}";
                              String date = "${_date.year}-${_date.month}-${_date.day}";
                              setState(() {
                                loaded = true;
                              });
                              var resp = await auth.writeReservation(widget.restaurant.restaurantId, AuthService.user["customer_id"], time, date, selectedTableNumber, selectedTableRoomNumber, informationText, peopleCounter);
                              print(resp);
                              if(resp == 200){
                                Navigator.pop(context);
                                showDialog<String>(
                                  context: context,
                                  builder: (BuildContext context) => AlertDialog(
                                    backgroundColor: secondColor,
                                    title: const Text('Tisch reserviert!',style: TextStyle(color: Colors.white),),
                                    content:  Text('Ihr Tisch wurde für den ${_date.day}.${_date.month}.${_date.year} um ${_time.format(context)} reserviert.',style: TextStyle(color: Colors.white),),
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
                              else{
                                setState(() {
                                  loaded = false;
                                });
                                showDialog<String>(
                                  context: context,
                                  builder: (BuildContext context) => AlertDialog(
                                    backgroundColor: secondColor,
                                    title: const Text('Fehlgeschlagen!',style: TextStyle(color: Colors.white),),
                                    content: Text('Ihr Tisch konnte leider am ${_date.day}.${_date.month}.${_date.year} um ${_time.format(context)} nicht reserviert werden.',style: TextStyle(color: Colors.white),),
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
                            }
                            else{
                              showDialog<String>(
                                context: context,
                                builder: (BuildContext context) => AlertDialog(
                                  backgroundColor: secondColor,
                                  title: const Text('Tisch auswählen!',style: TextStyle(color: Colors.white),),
                                  content: Text('Bitte wählen Sie einen Tisch für die Reservierung aus.',style: TextStyle(color: Colors.white),),
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
                          },
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
