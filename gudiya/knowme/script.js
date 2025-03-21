const knownPeople = {
    // all names available on ravi's facebook list
"kapil bhatta": "yes, i know kapil, He was Ravi's frined during Morning Glory Secondary School in +2.", "mohan joshi": "mohan? yes, i’ve heard of him. i don’t know much about him personally, but he’s connected with Ravi on social media.","birendra ": "bir en dra? hmm, yes, i’ve come across that name. i don’t know much about him/her, but he/she is connected with ravi on social media.","khagendra singh mahara": "yes, i know खगेन्द्र, although i don’t have much information about him, but he’s connected with ravi on social media.","sulav khatri": "sulav? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.","kp kalauni": "kp? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media. may be family member or brother!","kavi prasad kalauni": "kp? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media. may be family member or brother!","kailash bhat": "yes, i know कैलास, although i don’t have much information about him, but he’s connected with ravi online.","bandana bhatt": "yes, i know ßandana, although i don’t have much information about her, but she’s connected with ravi online.","manju joshi": "manju? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.","khagendra singh bhandari": "yes, i know खगेन्द्र, although i don’t have much information about him, but he’s connected with ravi online.","naresh kalauni": "naresh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.","aparichit": "aparichit? hmm, yes, i’ve come across that name. i don’t know much about him/her, but he/she is connected with ravi online.","deepak bhatta": "deepak? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.","kamal joshi": "kamal? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.","aayush chand": "aayush? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.","nischal joshi": "nischal? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.","manoj singh kunwar": "manoj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.","premraj pant": "premraj? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"parwati saud": "parwati? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"bal dev bhatt": "bal dev? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.","pawan raj joshi": "pawan raj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.","kapil bhatt": "kapil? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online. he was ravi's best friend during morning glory and still are friend.","kapil joshi": "kapil? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.","dropati kalauni": "dropati? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"deepak deepak": "deepak? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"dipak upadhayay": "dipak? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"saroj pandey": "yes, i know Saroj, although i don’t have much information about him, but he is connected with Ravi on social media.",
"binod bhatt": "binod? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.","sulav khatri": "yes, i know सुलभ, although i don’t have much information about him, but he is connected with Ravi on social media, and he was Ravi's friend during Morning Glory Secondary School.","sandesh baij": "sandesh? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.","prakash kalaunee": "prakash? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media and probabily be a relative.","bikash rana": "bikash? yes, i’ve heard of him. he’s connected with ravi online, he is ravi's friend during Morning Glory Secondary School, and still friend at Brixton college.","pooja kalauni": "pooja? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"gayatri bhatt": "gayatri? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"lochan bhatta": "lochan? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"prabesh kharel": "prabesh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"kishor karki": "kishor? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"himanshu pandeya": "himanshu? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"avinab chand thakuri": "avinab? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"npabsan kanchanpur": "npabsan? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"milan raj chimadi": "milan raj? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.",
"bipin joshi": "bipin? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"jagdish saud": "jagdish? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"su mit rokaya": "su mit? yes, i know him/her. i don’t have much information about him/her, but he/she is connected with ravi online.",
"dipesh khatri": "dipesh? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.",
"keshab bohara": "keshab? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"महेश बडु": "yes, i know महेश, although i don’t have much information about him, but he’s connected with ravi on social media.",
"kabita ayer": "kabita? yes, i’ve heard of her. i don’t know much about her, but she’s connected with ravi online.",
"sushil bist": "sushil? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"jeewan joshi": "jeewan? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"pri yanka puri": "pri yanka? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"binod bhandari": "binod? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"prawati kalaunee": "prawati? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"bikesh saud": "bikesh? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"adarsh vidya niketan secondary school": "adarsh vidya niketan? yes, i’ve heard of it. i don’t know much about it, but it’s connected with ravi on social media.","yamuna kalaunee": "yamuna? yes, i know her. i don’t have many details about her, but she’s connected with ravi online.","manish joshi": "manish? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.","deepak bhatt": "deepak? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.","bhupendra bhatt": "bhupendra? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.","swostika bhatt": "swostika? yes, i know her. i don’t have many details about her, but she’s connected with ravi online.","ďàmmøř màhàŕà": "ďàmmøř? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi online.","bipin rana": "bipin? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.","sandip bam": "sandip? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.","laxmi mahara budal": "laxmi? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi on social media.","radhika joshi": "radhika? yes, i know her. i don’t have many details about her, but she’s connected with ravi online.",
"prakash guragai": "prakash? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"janak raj joshi": "janak raj? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"ramchandra joshi": "ramchandra? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"nitin chand": "nitin? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.",
"mahakali modern bhansi": "mahakali modern? yes, i’ve heard of it. i don’t know much about it, but it’s connected with ravi online.",
"khakendra saud": "kha-kendra? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media. he is associated with IT Zone computer. Ravi talks about him.",
"santosh badu": "santosh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"sushil kalaunee": "sushil? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"rajandra mahara": "rajandra? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"lalit bhatt": "lalit? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.",
"mukesh prasad kalauni": "mukesh prasad? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"sã nii": "sã nii? hmm, yes, i’ve come across that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"rupesh joshi": "rupesh? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"arman rana": "yes, i know अरमान, although i don’t have much information about him, but he’s connected with ravi on social media.",
"upendra dhami": "upendra? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"gita joshi": "gita? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"mohan tiwari": "mohan? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"bhatta shushil": "shushil? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"shankar pujara": "shankar? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"khemraj kalauni": "khemraj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"bhatta madhu kalauni": "madhu? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"pàñ kàj": "pàñ kàj? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi on social media.",
"yogesh bhatta": "yes, i know योगेश, although i don’t have much information about him, but he’s connected with ravi online.",
"trilochan bhatta": "trilochan? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"parash parki": "parash? yes, i know him. i don’t have many details about him, but he’s a good friend of ravi.",
"hp kalaunee": "hp? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"amrit kalauni": "amrit? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"lokendra joshi": "lokendra? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"lokendra bist": "lokendra? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"dev raj joshi": "dev raj? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.",
"dropati bhatta": "yes, i know द्रोपती, although i don’t have much information about her, but she’s connected with ravi on social media.",
"chandra devi awasthi": "chandra devi? yes, i’ve heard of her. i don’t know much about her, but she’s connected with ravi online.",
"gayatri bhatt": "Yes, Ravi knows Gayatri. They met in the first semester at Brixton College and became friends. Ravi and Gayatri participated in a PPT competition together, and she was also the CR in the first semester. Ravi values their friendship.",
"hemant rawal": "Yes, Ravi knows Hemant. They met in the first semester at Brixton College and became friends. Ravi and Hemant spent time together, with Hemant being the fat but nice friend. Ravi enjoys their interactions and keeps him as a good friend.",
"himanshu pandeya": "Yes, Ravi knows Himanshu. They met in the first semester at Brixton College and became close friends. Ravi and Himanshu shared many fun moments, including posting reels on Instagram and always having a chill vibe when they meet.",
"hemesh nath": "Yes, Ravi knows Himesh. They met in the first semester at Brixton College and became close friends. Ravi and Himesh spent time together, and they both have an interest in coding. Himesh is the class CR (boy), intelligent, confident, and a natural leader. Ravi admires him and values their friendship.",
"hridayendra chand": "Yes, Ravi knows Hridayendra. They met in the first semester at Brixton College and became friends. Though not very close, Ravi considers Hridayendra a nice person.",
"jeevan bhatta": "Yes, Ravi knows Jeevan. They met in the first semester at Brixton College and became friends. Ravi and Jeevan spent time together, with Jeevan being a topper and friendly guy. Ravi values his openness and enjoys their friendship.",
"kabi raj bhatt": "Yes, Ravi knows Kabi. They met in the first semester at Brixton College and became friends. Ravi and Kabi spent time together, though Kabi tends to be overconfident and talk a lot in the WhatsApp group. Despite that, Ravi appreciates their friendship.",
"kusum dhami": "Yes, Ravi knows Kusum. They met in the first semester at Brixton College and became classmates. Ravi hasn’t interacted much with Kusum, but still considers her a nice person.",
"laxmi kumari bhatta": "Yes, Ravi knows Laxmi. They met in the first semester at Brixton College and became classmates. Ravi hasn’t interacted too much with Laxmi, but she’s nice to him.",
"lochan bhatta": "Yes, Ravi knows Lochan. They met in the first semester at Brixton College and became the best duo for all time. Ravi and Lochan spent time together, even having group study sessions for exams. They interact regularly, and Ravi considers him a great friend.",
"mahesh prasad bhatt": "Yes, Ravi knows Mahesh. They met in the first semester at Brixton College and became friends. Ravi and Mahesh spent time together, with Mahesh being a PU topper and having a roasting behavior. Despite this, Ravi appreciates their friendship.",
"nabin karki": "Yes, Ravi knows Nabin. They met in the first semester at Brixton College and became classmates. Though they haven’t interacted much, Ravi considers him a nice person.",
"aman bhatt": "aman? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"niharika bhatt": "niharika? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"hira joshi": "hira? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"Gopan madai": "gopan madai? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"amar khadayat": "amar? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"gaur singh dhami": "gaur singh? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"ram chandra joshi": "yes, i know राम चन्द्र, although i don’t have much information about him, but he’s connected with ravi on social media.",
"manish rana": "manish? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"bhanubhakta joshi": "bhanubhakta? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"santosh mahara": "santosh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"dilip chand": "dilip? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"tekendra mahara": "tekendra? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"nikita bc": "nikita? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"dipak upadhyay": "dipak? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"prabhat kalauni": "prabhat? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media. he is close or family member.",
"tilak kalaunee": "tilak? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"govind prasad": "govind? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"sishir thapa": "sishir? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"kamala bhatta": "kamala? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"shailesh bist": "shailesh? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"ramit bhatta": "ramit? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"aayush thakurathi": "Yes, Ravi knows Aayush. They met in the first semester at Brixton College and became close friends. Ravi and Aayush spent time together, often talking and sharing experiences. They also run a restaurant together. Ravi keeps him as a nice friend and appreciates their bond.",
"ashish bhatt": "Yes, Ravi knows Ashish. They met in the first semester at Brixton College and became friends. Ravi and Ashish spent time together, though Ashish’s roasting behavior is part of the fun. They still have a good relationship and interact regularly.",
"avinab chand": "Yes, Ravi knows Avinab. They met in the first semester at Brixton College and became good friends. Ravi and Avinab spent time together, discussing studies and sharing knowledge. Ravi keeps him as a smart and curious friend and always values their interactions.",
"bhumika joshi": "Yes, Ravi knows Bhumika. They met in the first semester at Brixton College and became friends. Ravi and Bhumika played badminton together and had some gaps in fun way. Ravi thinks she’s actually a nice girl.",
"bhuwan joshi": "Yes, Ravi knows Bhuwan. They met in the first semester at Brixton College and became friends. Ravi and Bhuwan spent time together, with Bhuwan being the confident topper in the class. Ravi admires his confidence and keeps him as a respected friend.",
"bishal joshi": "Yes, Ravi knows Bishal. They met in the first semester at Brixton College and became friends. Ravi and Bishal spent time together, with Bishal being the tall, childish, and sweet guy. He’s a really nice and friendly person, and Ravi enjoys their friendship.",
"deepak bohar": "Yes, Ravi knows Deepak. They met in the first semester at Brixton College and became friends. Ravi and Deepak spent time together, with Deepak being known for his comedy. He’s a fun, easygoing guy, and Ravi enjoys their bond.",
"dipika chand": "Yes, Ravi knows Dipika. They met in the first semester at Brixton College and became classmates. Though they haven’t interacted much, Ravi thinks she’s a nice person.",
"pankaj chand": "Yes, Ravi knows Pankaj. They met in the first semester at Brixton College and became close friends. Ravi and Pankaj spent time together, and Ravi thinks of him as a nice and friendly person.",
"parwati kumari saud": "Yes, Ravi knows Parwati. They met in the first semester at Brixton College and became friends. Ravi admires her as a topper girl and appreciates her kind nature.",
"prashant paneru": "Yes, Ravi knows Prashant. They met in the first semester at Brixton College and became friends. Ravi and Prashant spent time together, and Ravi thinks he’s a nice guy.",
"prem raj pant": "Yes, Ravi knows Prem. They met in the first semester at Brixton College and became friends. Ravi and Prem spent time together, with Prem being a nice friend, always in good spirits. His nickname 'Topper' says it all!",
"prerana bhatt": "Yes, Ravi knows Prerana. They met in the first semester at Brixton College and became classmates. Though they haven’t interacted too much, Ravi thinks of her as a nice and sweet girl.",
"kishor pant": "kishor? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"prem datta kalaunee": "prem datta? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"janaki joshi": "yes, i know जानकी, although i don’t have much information about her, but she’s connected with ravi on social media.",
"sà g Ãr": "sà g Ãr? hmm, yes, i’ve come across that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"deepak kalaunee": "deepak? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"prashant dhami": "prashant? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"niraj bist": "niraj? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"anish shah": "ÃÑìsh? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"milan chand": "milan? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.",
"tilak raj bhatt": "tilak raj? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.",
"naresh mahara": "naresh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi on social media.",
"namraj joshi": "namraj? yes, i know him. i don’t have many details about him, but he’s connected with ravi online.",
"raj kalauni": "raj? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi on social media.",
"shahil joshi": "shahil? yes, i know him. i don’t have much information about him, but he’s connected with ravi online.",
"dhirendra mahara": "dhirendra? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"tekraj joshi": "tekraj? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"nisha dhami saud": "nisha? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"padam raj joshi": "padam raj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"srijana bist": "srijana? yes, i’ve heard of her. i don’t know much about her, but she’s connected with ravi online.",
"jagdish kalauni": "jagdish? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"alina kalauni": "alina? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"bishal kalauni": "bishal? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"keshab karki": "keshab? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"ritik bhatta": "ritik? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"kritika nath yogi": "kritika? yes, i’ve come across her name. i don’t know much about her, but she’s connected with ravi online.",
"manish kalauni": "manish? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"kailash kalauni": "kailash? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"janaki devi kalaunee": "janaki devi? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"harish ra amita": "harish? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"birdatt joshi": "birdatt? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"jagdish joshi": "jagdish? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"puspa kalauni": "puspa? yes, i know her. i don’t have many details about her, but she’s connected with ravi on social media.",
"sagar bist": "sagar? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"rajendra bhatta": "rajendra? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"chandra joshi": "chandra? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"chhiitij thagunna": "xitij? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"sumit paudel": "sumit? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"dharmesh joshi": "dharmesh? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"suraj parki": "suraj? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"suron dangaura": "suron? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"aayush ayer": "Yes, Ravi knows Aayush. They met in the first semester at Brixton College and became good friends. Ravi and Aayush spent time together, and though they don’t interact too much, they still share a good bond. Ravi thinks well of him and values their friendship.",
"priti joshi": "Yes, Ravi knows Priti. They met in the first semester at Brixton College and became classmates. Ravi hasn’t interacted much with Priti but finds her cute, nice, and sweet.",
"puja bhatt": "Yes, Ravi knows Puja. They met in the first semester at Brixton College and became good friends. Ravi and Puja have known each other since studying at Morning Glory, and she still remains a close friend. She calls him 'Brother,' and Ravi thinks she’s intelligent, friendly, and a nice person.",
"rakshya bhatt": "Yes, Ravi knows Rakshya. They met in the first semester at Brixton College and became friends. Ravi interacted with Raksha mainly during exams, as she always sat in the front. She’s a cute, nice, and sweet girl, and Ravi enjoys their bond.",
"ravi prasad kalauni": "Yes, Ravi knows Ravi. They met in the first semester at Brixton College and became friends. Ravi is, of course, himself, and he thinks well of all his friends, valuing his relationships with everyone.",
"rohit joshi": "Yes, Ravi knows Rohit. They met in the first semester at Brixton College and became friends. Ravi and Rohit spent time together, with Rohit being a handsome guy and always sitting at the back during exams. Ravi appreciates him as a friendly and nice friend.",
"sabina joshi": "Yes, Ravi knows Sabina. They met in the first semester at Brixton College and became classmates. Though not very close, Ravi considers her a nice person.",
"sagar bhatta": "Yes, Ravi knows Sagar. They met in the first semester at Brixton College and became friends. Ravi and Sagar spent time together, with Sagar being a nice, friendly, and sweet guy.",
"samikshya bhatt": "Yes, Ravi knows Samikshya. They met in the first semester at Brixton College and became friends. Ravi and Samikshya had some good times and gaps, but Ravi hopes it will be resolved soon, as she’s actually a nice person.",
"saphal awasthi": "Yes, Ravi knows Saphal. They met in the first semester at Brixton College and became classmates. Though not very close, Ravi finds him a nice person.",
"sumit paudel": "Yes, Ravi knows Sumit. They met in the first semester at Brixton College and became friends. Ravi and Sumit spent time together, and Sumit is known as a chill guy in the class. Ravi enjoys their relaxed vibe.",
"sumit rokaya": "Yes, Ravi knows Sumit. They met in the first semester at Brixton College and became close friends. Ravi and Sumit spent time together, with Sumit being a nice, talkative, and sweet friend.",
"mukesh dhanuk": "Yes, Ravi knows Mukesh. They met in the first semester at Brixton College and became classmates. Though not much interaction, Ravi considers him a nice person.",
"nabin bhatta": "nabin? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"dev raj joshi": "dev raj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"hemant joshi": "hemant? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"laxit s. dhami": "laxit? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"khyam regmi": "khyam? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"debaki kalauni": "debaki? yes, i know her. i don’t have much information about her, but she’s connected with ravi on social media.",
"ravi luhar": "ravi? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"bisan bahadur dhanuk": "bisan bahadur? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"dhandev kalaunee": "dhandev? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"sagar bhatta": "sagar? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"amït chàûdhåry": "amït? hmm, yes, i’ve heard that name. i don’t know much about him/her, but he/she is connected with ravi online.",
"ganesh sita": "ganesh? yes, i’ve heard of him. i don’t know much about him, but he’s connected with ravi online.",
"santosh mahara": "santosh? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"nuvu kalauni": "nuvu? yes, i’ve come across his/her name. i don’t know much about him/her, but he/she is connected with ravi online.",
"devraj rana": "devraj? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
"tina tiruwa": "tina? yes, i’ve heard of her. i don’t know much about her, but she’s connected with ravi online.",
"suron chaudhary": "suron? yes, i know him. i don’t have many details about him, but he’s connected with ravi on social media.",
"pashupati pant": "pashupati? yes, i’ve come across his name. i don’t know much about him, but he’s connected with ravi online.",
"bashudev kalauni": "bashudev? yes, i know him. i don’t have much information about him, but he’s connected with ravi on social media.",
       

};



function checkName() {
    const inputField = document.getElementById("nameInput");
    const inputName = inputField.value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");

    if (!inputName || !inputName.replace(/\s+/g, "")) {
        resultDiv.textContent = "Please enter a name.";
        return;
    }

    // Check if the input contains at least two words (first & last name)
    if (inputName.split(/\s+/).length < 2) {
        resultDiv.textContent = "Please enter your full name.";
        return;
    }

    resultDiv.innerHTML = "Gudiya is typing...<span class='blinking-cursor'>|</span>"; // Typing indicator with cursor
    resultDiv.style.opacity = "1";

    setTimeout(() => {
        const response = knownPeople[inputName]
            ? `You mean ${capitalize(inputName)}? ${knownPeople[inputName]}`
            : "Sorry, Ravi doesn't know you.";

        typeResponse(response, resultDiv);
    }, 1000); // Thinking delay (0.5s)
}

// Simulate typing effect
function typeResponse(text, element) {
    element.innerHTML = ""; // Clear previous content
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 10); // Adjust speed of typing effect
        } else {
            element.innerHTML += "<span class='blinking-cursor'>|</span>"; // Add cursor after typing
        }
    }

    typing();
}

// Capitalize first letter of each word
function capitalize(name) {
    return name.replace(/\b\w/g, char => char.toUpperCase());
}

// Trigger checkName() when Enter key is pressed
document.getElementById("nameInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkName();
    }
});

// Toggle Side Navigation Bar
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Focus input field on page load
window.onload = () => {
    document.getElementById("nameInput").focus();
};
