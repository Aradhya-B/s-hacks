import 'package:flutter/material.dart';
import 'package:slide_to_confirm/slide_to_confirm.dart';

void main() {
  runApp(MyApp());
}

// consts

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
        primarySwatch: Colors.blue,
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
            child: Text("Forwarding Settings"),
          ),
        ),
        decoration: tileDecoration);
  }
}

class Bills extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
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
            itemCount: 3,
            shrinkWrap: true,
            itemBuilder: (BuildContext context, int index) {
              return BillTile(name: "Alectra Utilities", amount: 5000);
            },
            separatorBuilder: (BuildContext context, int index) {
              return Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: billDivider,
              );
            },
          ),
          SizedBox(height: 30),
          TotalTile(amount: 15000),
          SizedBox(height: 40),
        ],
      ),
    );
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
            Text("\$${(amount / 10).toStringAsFixed(2)}"),
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
                "\$${(amount / 10).toStringAsFixed(2)}",
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
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
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
            child: Icon(Icons.help_outline),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(18, 0, 18, 0),
        child: Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                SizedBox(height: 24),
                TopNavBar(),
                SizedBox(height: 24),
                ForwardingTile(),
                SizedBox(height: 24),
                Bills(),
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
            icon: Icon(Icons.home),
            title: Text("Home"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.rotate_left),
            title: Text("Transfer"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.pages),
            title: Text("Bills"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.more),
            title: Text("More"),
          ),
        ],
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}