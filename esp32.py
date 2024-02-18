import network
import urequests
from time import sleep
from machine import UART

uart1 = UART(1, baudrate=115200, tx=17, rx=16)

wlan = network.WLAN(network.STA_IF) # create station interface
wlan.active(True)       # activate the interface
wlan.scan()             # scan for access points
wlan.isconnected()      # check if the station is connected to an AP
wlan.connect('Tetris', 'abcd1234') # connect to an AP
wlan.config('mac')      # get the interface's MAC address
wlan.ifconfig()         # get the interface's IP/netmask/gw/DNS addresses

url = "http://ed50-138-51-93-72.ngrok-free.app/command"
while True:
    response = urequests.get(url)
    
    if response != None and response.status_code == 200:
        response_json = response.json()
        if "command" in response_json:
            correct_string = response_json["command"]
            uart1.write(correct_string)
    uart1.write("\n")
    
    response.close()
    sleep(1)