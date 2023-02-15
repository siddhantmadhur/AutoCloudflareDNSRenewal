# Automatic Cloudflare DNS Renewal
__Created by Siddhant Madhur__

__Contact__
Email: [siddhant.madhur@gmail.com](mailto:siddhant.madhur@gmail.com)

## Please Note
This guide is only guaranteed to work on Linux. I'm sure you could translate some of the steps to work on Windows as the actual code is cross-platform but I haven't tried it on Windows yet.

## Why use this?
Does your ISP reset your public IP address every day, or maybe every week, or maybe even every few hours? This is an extremely simple CLI tool which automatically checks if your IP has changed. It checks every 30 minutes and if it detects a difference it automatically updates Cloudflare with the new details.



## How to use?

#### Pre-requisites:
For this guide to work, I hope that you have npm already installed. If not please research on how to install npm on your system. My second consideration is that you already have a website setup on Cloudflare, with the DNS Record in place.

#### Step 1: Downloading the software required
Use the following script to download and install the CLI tool.

On Linux:
```
sudo git clone https://github.com/SiddhantMadhur/AutoCloudflareDNSRenewal.git /tmp/dnsupdate && cd /tmp/dnsupdate && sudo npm install && sudo npm install -g . && cd /home/$USER && sudo rm -R /tmp/dnsupdate
```
Congrats, now you have the actual CLI tool, you just have to add the environment variables for it to work.

#### Step 2: Getting to your Token Page
The script needs your Cloudflare API token to actually make changes.

Go to [your cloudflare dashboard](https://dash.cloudflare.com/) and click on the face icon in the top right corner of your screen.

![image](https://user-images.githubusercontent.com/51441307/218895906-cd86a8d2-7052-4d38-8a2f-543567323185.png)

Under it click on "My Profile" with your email address.

#### Step 3: Creating your Token

Click on API Tokens in the navigation bar on the left side of your screen and create a new Token.

![image](https://user-images.githubusercontent.com/51441307/218896232-467dcbb1-1e5c-49f2-9f0e-941898f31b36.png)



Click on the "Edit Zone DNS" use template button, as that's what we aim to achieve.

![image](https://user-images.githubusercontent.com/51441307/218896367-db585eab-44c3-4b1b-88a3-67c4c0252620.png)



Add a permission to read, specify the site you'd like to include in this, and finally specify how long you want the token to be active. This is the time duration the token will actually work so make it something long enough where you don't have to change it too often but also short enough incase it gets leaked.
Finally it should look like this.

![image](https://user-images.githubusercontent.com/51441307/218896506-7e17f4b2-5ff7-4112-8333-f5213b5517c4.png)

Now it should display your token! Save this, and keep it secure.


__For Linux__

You can save this in the system path using the following code
```
export TOKEN="yourtokenhere"
```
replacing 'yourtokenhere' with the acual token you got.

#### Step 4: Get your Zone ID
Go back to [your cloudflare dashboard](https://dash.cloudflare.com/)  and click on the website of your choice.
On the right side, i.e. the third column, you should find your Zone ID under the API sub-section.
Save this as well.

We'll export this aswell

__For Linux__

```
export ZONE_ID="yourzoneidhere"
```

#### Step 5: Get your DNS Record ID
I'm hoping you already have the dns record which you want to change automatically. In order to get its Record ID use the dns id grabber tool included.
Use the following command to get all DNS Records
```
getdnsrecords
```
This should output a bunch of dns records, pay attention to the one you wish to change. Grab the id of the one you chose, along with its name and type. Content isn't important because we're gonna change it in a bit

```
export DNS_ID="whateverIdYouSaw"
export TYPE="whateverTypeYouSaw"
export NAME="whateverNameYouSaw"
```

#### Step 5.2: Permanently saving the variables

By default, these variables will reset once you close the terminal, or restart your computer. In order to permanently save these, follow the following steps

Open ~/.bashrc in your choice of text editor

```
nano ~/.bashrc
```
Then add the export commands here

```
export TOKEN="yourtokenhere"
export DNS_ID="whateverIdYouSaw"
export TYPE="whateverTypeYouSaw"
export NAME="whateverNameYouSaw"
```
This will ensure the variables are present on every reload.

#### Step 6: Running the command
You're Done! with the actual setup atleast. You can run the following command

```
autodnscheck
```

Now you can create a new terminal and run autodnscheck and as long as the command or terminal stays live, your dns will get automatically updated.
To exit you can close the terminal or press "Ctrl + C"

#### Step 7: Get Creative [Optional]
If you don't want a constant open terminal, get creative! You can add autodnscheck to your startup commands, or create a tmux/screen session dedicated to this, its completely upto you!
