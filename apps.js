// ১. টিভি চ্যানেলের নাম (বাংলায়) এবং m3u8 লাইভ লিংক
const channels = [
    {
        name: "সময় টিভি (বাংলাদেশ)",
        url: "https://bdiptv.stream:8081/somoy/index.m3u8"
    },
    {
        name: "যমুনা টিভি (বাংলাদেশ)",
        url: "https://bdiptv.stream:8081/jamuna/index.m3u8"
    },
    {
        name: "সংসদ টিভি (বাংলাদেশ)",
        url: "https://bdiptv.stream:8081/sangsad/index.m3u8"
    },
    {
        name: "আল জাজিরা ইংলিশ (আন্তর্জাতিক)",
        url: "https://live-alsat.secure.footprint.net/atv/index.m3u8"
    },
    {
        name: "নাসা টিভি (বিজ্ঞান)",
        url: "https://ntvlive-lh.akamaihd.net/i/NASA_1@301454/master.m3u8"
    }
];

// ২. HTML এলিমেন্ট কানেক্ট করা
const video = document.getElementById('video');
const channelSelect = document.getElementById('channelSelect');

// ৩. ড্রপডাউন মেনুতে চ্যানেলগুলোর নাম লোড করা
channels.forEach((channel) => {
    let option = document.createElement('option');
    option.value = channel.url;
    option.textContent = channel.name;
    channelSelect.appendChild(option);
});

// ৪. ড্রপডাউন থেকে চ্যানেল সিলেক্ট করলে তা প্লে করা
channelSelect.addEventListener('change', function() {
    const streamUrl = this.value;
    if (streamUrl) {
        playM3U8(streamUrl);
    }
});

// ৫. m3u8 ভিডিও প্লে করার মেইন ফাংশন
function playM3U8(url) {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        alert("দুঃখিত! আপনার ব্রাউজারটি এই লাইভ ভিডিও প্লে করতে পারছে না।");
    }
}
