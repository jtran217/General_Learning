# March 13, 2026

Exercise one was teaching me how to use python socket library to create a simple HTTP client to make a get request to a server (example.com).
Important things I learned:

- messages are passed as bytes, so its important to encode and decode them.
- Sending a raw request needs to follow HTTP protocol, which means the request line must be followed by headers and a blank line before the body (if any).

 GET / HTTP/1.1\r\n
  Host: example.com\r\n
  \r\n

- Lastly, the response from the server is also in bytes so it must be decoded to be human readable. The response includes the status line, headers, and body, all of which are separated by CRLF (\r\n). The headers and body are separated by a blank line (\r\n\r\n).
  - Interesting enough, CRLF stands for Carriage Return + Line Read, which are concept from early physical typewriters. Carriage return moves the cursor to the beginning of the line, while line feed moves the cursor down to the next line. In HTTP, CRLF is used to indicate the end of a line in headers and to separate headers from the body.
