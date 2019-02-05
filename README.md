# blockChainNetwork

For windows :
1. Install redis Redis-x64-3.2.100 installer. While, installing do check the add to Path variable. 
    The following steps depict the way to register the Redis Service to the Service Control Manager:
    a. Run Command Prompt in elevated user context such as Administrator.
    b. Change folder to where latest Redis zip folder has been extracted. 
    c. Execute the following command at the command prompt:
    d. redis-server.exe --service-install redis.windows-service.conf

    Open Service Control Manager and find the Service Name as Redis appearing in the list of services. Right click it and start the service.
    Likewise various arguments have been introduced for Redis Service to start, stop, rename and uninstall the Service. Their usage is as follows,

    redis-server.exe –service-start
    redis-server.exe –service-stop
    redis-server.exe –service-name<name>
    (This one is to change the default name of the service)
    redis-server.exe –service-uninstall
    Checking Redis Connectivity

    To ensure that Redis Service is working properly, connect the Redis instance using redis-cli.exe utility which is present right under the Redis folder. For that purpose perform the following steps:

    Open Command Prompt
    Change folder to Installed Redis Folder location (by default C:\Program Files\Redis)
    Enter command redis-cli.exe
    A command prompt will change to “127.0.0.1:6379>“
    Now perform the following commands:

    a. SET sampleKey sampleValue
    The key called sampleKey will be set with its value = sampleValue

    b. KEYS *
    It will list all the keys set so far. In our case it will list “sampleKey”.

    c. GET sampleKey

    It will return its corresponding value i.e. sampleValue.

    d. DEL sampleKey
    This command will delete key & value for sampleKey key from Redis Data Store.

    e. FLUSHALL
    This command will delete all the keys & their corresponding values from Redis Data Store.
    Note: For all commands please refer to Redis IO Commands.

    Once this has worked, it indicates that Redis Server has got installed properly.
    
    You can verify the service running from task manager, start/stop directly from there or from the above mentioned start/stop commands.
    
2. modify the package.json file with start-redis script as redis-server.exe --service-start
    Do stop it when not in use.

3. Download and install node.js
4. To build and install the dependecy, npm install.
5. After, all the dependencies have been added, start the server and app with npm run dev.
6. To start another instance of the same app to verify blockchain sync usnig pubsub , open another termminal and instead of npm run dev , do
    npm run dev-peer --> it will start the instance of app on another port.
