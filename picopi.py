#This tutorial is provided by TomoDesign / https://www.instagram.com/tomo_designs/ 
import time
import board
import digitalio
import usb_hid
import json
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
import busio
import storage

def send_keycodes(list):
    for keycode in list:
        kbd.send(keycode)
        

kbd = Keyboard(usb_hid.devices)
# shutdown = [Keycode.GUI, Keycode.]

# For most CircuitPython boards:
led = digitalio.DigitalInOut(board.LED)
# For QT Py M0:
# led = digitalio.DigitalInOut(board.SCK)
led.direction = digitalio.Direction.OUTPUT


uart = busio.UART(board.GP0, board.GP1, baudrate=115200)

while True:
    print("Hello")
    command = uart.readline()
    
    print(command)
    if command != None:
        command = command[:-1].decode("utf-8")
        
        splitCommands = command.split("|")
        
        for splitC in splitCommands:
            simulPressed = splitC.split("+")
            
            kbd.press(*simulPressed)
            time.sleep(0.5)
            kbd.release(*simulPressed)
    