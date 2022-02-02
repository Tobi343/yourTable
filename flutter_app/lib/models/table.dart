import 'package:flutter/material.dart';

class Table{
  int key;
  int x;
  int y;
  int width;
  int height;

  Table({
    required this.key,
    required this.x,
    required this.y,
    required this.width,
    required this.height;
  });

  Table.fromMap(Map map) :
        this.key = map['key'],
        this.x = map['x'],
        this.y = map['y'],
        this.width = map['width'],
        this.height = map['height'];
}