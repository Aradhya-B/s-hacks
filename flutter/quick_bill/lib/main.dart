import 'dart:async';

import 'package:flutter/material.dart';
import 'package:quick_bill/Bill.dart';
import 'package:quick_bill/quick_bill_icons_icons.dart';
import 'package:slide_to_confirm/slide_to_confirm.dart';
import 'package:http/http.dart' as http;
import "dart:convert";
import 'package:intl/intl.dart';

void main() {
  runApp(MyApp());
}

// consts
final moneyFormat = new NumberFormat("#,##0.00", "en_US");

BoxDecoration tileDecoration = BoxDecoration(
  color: Colors.grey[900],
  borderRadius: BorderRadius.circular(10),
  border: Border.all(
    color: Colors.grey,
    width: 1.2,
  ),
);

Widget billDivider = Padding(
  padding: const EdgeInsets.only(left: 12, top: 8, bottom: 8, right: 12),
  child: Divider(
    thickness: 1.2,
    height: 2,
    color: Colors.grey,
  ),
);

// app begins

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.red,
        brightness: Brightness.dark,
        canvasColor: Colors.black,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class TopNavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Text(
          "Make a Payment",
          style: TextStyle(
            color: Colors.white,
          ),
        ),
        Container(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(
              "Manage Bills",
              style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            ),
          ),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(width: 2.0, color: Colors.red),
            ),
          ),
        )
      ],
    );
  }
}

class ForwardingTile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Row(
              children: [
                Icon(
                  QuickBillIcons.settings_24px,
                  color: Colors.purple,
                ),
                SizedBox(width: 20),
                Text(
                  "Forwarding Settings",
                  style: TextStyle(fontSize: 18),
                ),
              ],
            ),
          ),
        ),
        decoration: tileDecoration);
  }
}

class Bills extends StatelessWidget {
  final List<Bill> bills;

  Bills({this.bills});

  @override
  Widget build(BuildContext context) {
    int _total = 0;

    bills.forEach((element) {
      _total += element.amount;
    });

    if (bills.length > 0) {
      return Container(
        decoration: tileDecoration,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Align(
              child: Padding(
                padding: const EdgeInsets.only(left: 39.0, top: 24),
                child: Text(
                  "Forwarded Bills",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
                ),
              ),
              alignment: Alignment.centerLeft,
            ),
            billDivider,
            SizedBox(height: 4),
            ListView.separated(
              itemCount: bills.length,
              shrinkWrap: true,
              itemBuilder: (BuildContext context, int index) {
                return BillTile(
                    name: bills[index].description,
                    amount: bills[index].amount);
              },
              separatorBuilder: (BuildContext context, int index) {
                return Padding(
                  padding: const EdgeInsets.only(top: 4.0),
                  child: billDivider,
                );
              },
            ),
            SizedBox(height: 30),
            TotalTile(amount: _total),
            SizedBox(height: 40),
          ],
        ),
      );
    } else {
      return Padding(
        padding: const EdgeInsets.only(top: 120.0),
        child: Center(
          child: Container(
            decoration: tileDecoration,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 32, 16, 48),
              child: Column(
                children: [
                  Text(
                    "No Bills",
                    style: TextStyle(fontSize: 18),
                  ),
                  billDivider,
                  Text(
                    "You have no bills! Send an email with a bill attachment to scotiabank.alakazam.abansal@gmail.com \n for quick bill to process your bill.",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }
  }
}

class BillTile extends StatelessWidget {
  final String name;
  final int amount;

  BillTile({this.name, this.amount});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(
              this.name,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
            ),
            Text("\$${moneyFormat.format((amount / 100))}"),
          ],
        ),
        SizedBox(height: 2.5),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(
              "   Tap to view insights",
              style: TextStyle(color: Colors.grey),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(8.0, 4, 8, 4),
                child: Text("Pay now"),
              ),
              decoration: BoxDecoration(
                  color: Colors.red, borderRadius: BorderRadius.circular(20)),
            ),
          ],
        ),
      ],
    );
  }
}

class TotalTile extends StatelessWidget {
  final int amount;

  TotalTile({this.amount});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              "Total",
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 17,
                  color: Colors.greenAccent),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 120.0),
              child: Text(
                "\$${moneyFormat.format((amount / 100))}",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 17,
                    color: Colors.greenAccent),
              ),
            ),
          ],
        ),
        SizedBox(height: 2.5),
      ],
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Bill> _bills = [];

  bool _paid = false;
  bool _loading = false;

  Future<void> fetchBills() async {
    if (!_paid) {
      List<Bill> bills = [];

      http.Response response =
          await http.get("http://29fccd75f166.ngrok.io/api/bills");

      if (response.statusCode == 200) {
        // If the server did return a 200 OK response,
        // then parse the JSON.

        List<dynamic> data = json.decode(response.body);

        data.forEach((billJson) {
          bills.add(Bill.fromJson(billJson));
        });
      } else {
        // If the server did not return a 200 OK response,
        // then throw an exception.
        throw Exception('Failed to load bills');
      }

      setState(() {
        _bills = bills;
      });
    }
    return;
  }

  void pay() async {
    setState(() {
      _loading = true;
    });

    await Future.delayed(Duration(seconds: 3));

    setState(() {
      _paid = true;
      _loading = false;
      _bills = [];
    });
  }

  @override
  void initState() {
    super.initState();

    fetchBills();
    Timer.periodic(new Duration(seconds: 3), (timer) {
      fetchBills();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Bills"),
        centerTitle: true,
        leading: Icon(Icons.arrow_back_ios),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: GestureDetector(
                onTap: () {
                  setState(() {
                    _paid = false;
                    _loading = false;
                  });
                },
                child: Icon(Icons.help_outline)),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(18, 0, 18, 0),
        child: Stack(
          children: [
            Column(
//              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                SizedBox(height: 24),
                TopNavBar(),
                SizedBox(height: 24),
                ForwardingTile(),
                SizedBox(height: 24),
                if (!_loading)
                  if (!_paid)
                    Bills(
                      bills: _bills,
                    )
                  else
                    Container()
                else
                  CircularProgressIndicator(),
                if (_paid)
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 150.0),
                      child: Text(
                        "All bills paid!",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                            color: Colors.greenAccent),
                      ),
                    ),
                  )
                else
                  Container(),
              ],
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 50.0),
                child: ConfirmationSlider(
                  foregroundColor: Colors.red,
                  backgroundColor: Colors.grey[900],
                  textStyle: TextStyle(color: Colors.white, fontSize: 18),
                  text: "Slide to pay all",
                  onConfirmation: pay,
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 2,
        unselectedItemColor: Colors.white,
        selectedItemColor: Colors.red,
        showUnselectedLabels: true,
        items: [
          BottomNavigationBarItem(
            icon: Icon(QuickBillIcons.home_24px_outlined),
            title: Text("Home"),
          ),
          BottomNavigationBarItem(
            icon: Icon(QuickBillIcons.loop_24px_outlined),
            title: Text("Transfer"),
          ),
          BottomNavigationBarItem(
            icon: Icon(QuickBillIcons.bill_1),
            title: Text("Bills"),
          ),
          BottomNavigationBarItem(
            icon: Icon(
              QuickBillIcons.notes_24px,
              size: 14,
            ),
            title: Text("More"),
          ),
        ],
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
