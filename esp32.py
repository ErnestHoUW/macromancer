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

url = "http://e123-138-51-93-72.ngrok-free.app/command"
transaction = 0
while True:
    print("checking for command")
    response = urequests.get(url)
    
    if response != None and response.status_code == 200:
        response_json = response.json()
        if "commands" in response_json:
            arr_num = response_json["commands"]
            
            completed = False
            
            
            while not completed:
                correct_string = ""
                total = 0
                
                for n in arr_num:
                    temp = 0
                    if type(n) is list:
                        temp = sum(n)
                        correct_string += "+".join(str(x) for x in n) + "|"
                    else:
                        correct_string += str(n) + "|"
                        temp = n
                    
                    total += temp

                correct_string = correct_string[:-1]
                send = correct_string + 'c' + str(total) + 't' + str(transaction) + "\n"
                
                print("Sever send:", send.encode("utf-8"))
                uart1.write(send.encode("utf-8"))
                
                back = uart1.readline()
                print("from client:", back)
                
                if back.decode("utf-8") == "Done\n":
                    transaction += 1
                    completed = True                    
                
                

    
    response.close()
    sleep(1)