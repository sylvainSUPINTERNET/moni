
# Setup protoc

Get linux terminal on windows ( or use it directly ) 


### Install


```` bash 

npm install grpc-web --save


# If you use protobuf from google such as timestamp / empty etc it's mandatory ( to be imported by your own .proto)

npm i google-protobuf --save

````


__GRPC__

```` bash

apt-get install protobuf-compiler

# check typing "protoc", should be default installed in /usr/bin

````

Download one version here : https://github.com/protocolbuffers/protobuf/releases 

Whatever the version, just inside get the include directory ( contains google extension usefull for our own .proto file such as .Empty etc )

```` bash 

cp -R protoc/include/ /usr/bin/

````

You must also copy google-protobuf/google/protobuf to your project /src/proto folder



__GRPC WEB__ 

go to download your version here : https://github.com/grpc/grpc-web/releases


```` 

# Rename it 

mv <your_grpc_web_download> protoc-gen-grpc-web

# Copy to your PATH ( protoc will try to call with protoc-gen-grpc-web it when you add --grpc-web_out )

cp protoc-gen-grpc-web /usr/bin


````


# Generate your code based on your .proto

Go to your project root directory, then : 

```` bash


# From the root directory, trying to find .proto file : src/proto/greet.proto and out as typescript "importable" package

protoc --js_out=import_style=commonjs,binary:. src/proto/greet.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:.


````


You should have 3 files generated at this point : 


```` bash

greet_pb.d.ts 
greet_pb.js 
GreetServiceClientPb.ts 

```` 

