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

transaction = 0

while True:
    print("Hello")
    complete = False
    
    splitCommands = None
    while not complete:
        total = 0
        checksum = -1
        command = uart.readline()
        runCommand = False
        
        print("from server:", command)
        
        try:
            if command is None:
                raise ValueError
            
            command = command.decode("utf-8")
            
            split = command.split("c")
            
            print("1", split)
            
            if len(split)!= 2:
                raise IndexError
            
            command = split[0]
            
            metadata = split[1]
            
            split2 = metadata.split("t")
            
            if len(split2) != 2:
               raise IndexError
            
            checksum = int(split2[0]) 
            given_t = int(split2[1][:-1])
            
            if given_t >= transaction:            
                splitCommands = command.split('|')
                for n in splitCommands:
                    simulPressed = n.split("+")
                    for s in simulPressed:
                        total += int(s)
                        
                if total != checksum:
                    raise ValueError
                    
            
                complete = True
                transaction += 1
                            
            uart.write(b"Done\n")
                
  
            
        except (ValueError, IndexError) as error:
            print("Client send: Failed")
            uart.write(b"Failed\n")
        
        
            
    

    if splitCommands != None:
        for splitC in splitCommands:
            simulPressed = [int(x) for x in splitC.split("+")]
            
            kbd.press(*simulPressed)
            time.sleep(0.5)
            kbd.release(*simulPressed)
    