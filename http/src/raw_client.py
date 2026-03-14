# Exercise 1: Raw HTTP Client
# The goal: Make an HTTP GET request using nothing but Python's socket module. No requests, no urllib, no http.client.
# What to build: A function that takes a URL (HTTP only, no HTTPS yet) and returns the response body as a string.
import socket

# Ends in r\n\r\n - Extra line tells server request headers are done.
msgFormat = "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"

def get(url,port):
# Open TCP connnection
# Send text message (HTTP) request through connection
# Read the text message back (the http response)
# Parse it and hands the body 
    if url.startswith("http://"):
        url = url[len("http://"):]
    try:
        connection = socket.create_connection((url,port))
        msgBytes = msgFormat.encode()
        connection.sendall(msgBytes)
        message = connection.recv(4096)
        cleanedMessage = message.decode().split("\r\n\r\n")[1]
        cleanedMessage = cleanedMessage.split("\r\n")[1]
        print(cleanedMessage)


    except Exception as e:
        print("Error creating connection: ", e)


get("example.com",80)

