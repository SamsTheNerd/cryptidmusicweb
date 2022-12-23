
var audioCtx;
var analyser;
var source;
var wavesurfers = [];

var isPlaying = false;

var numSnippets = 0;
var onSnippet = 0;

var setupAudio = () => {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
}

var changeSource = (elemId) => {
    var thisElem = document.getElementById(elemId);
    source = audioCtx.createMediaElementSource(thisElem);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
}

var getFrequencyData = () => {
    analyser.fftSize = 1024;
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);
    return freqData;
}

var setPlayingIcons = () => {
    if(isPlaying){
        document.getElementById("pauseIcon").classList.remove("hidden");
        document.getElementById("playIcon").classList.add("hidden");
    } else {
        document.getElementById("playIcon").classList.remove("hidden");
        document.getElementById("pauseIcon").classList.add("hidden");
    }
}

var waveformFinished = () => {
    isPlaying = false;
    setPlayingIcons();
}

var playAudio = () => {
    // var thisElem = document.getElementById("testAud");
    // thisElem.play();
    
    wavesurfers[onSnippet].playPause();
    isPlaying = !isPlaying;
    setPlayingIcons();
}

var resultElem;

var makeTestFreqGraph = () => {
    var container = document.getElementById("freqDisplay");
    for(var i = 0; i < 512; i++){
        container.innerHTML += `<div class="freqBar" id="freqBar${i}"></div>`;
    }
}

var getAvgFreq = (freqData) => {
    var total = 0;
    for(var i = 0; i < freqData.length; i++){
        total += freqData[i];
    }
    return total/freqData.length;
}


var makeSnippet = (thisSnippet, index) => {
    var snippetHTML = `<div id="snippet-${index}" class="snippet">
    <div id="waveform-${index}" class="waveform"></div>
    <div class="snippetTitle">
    ${thisSnippet.title}
    </div>
    </div>`;
    document.getElementById("placeholder-snippet").innerHTML = snippetHTML;
    document.getElementById("snippetHolder").appendChild(document.getElementById("placeholder-snippet").firstElementChild);

    wavesurfers[index] =  WaveSurfer.create({
        container: `#waveform-${index}`,
        waveColor: 'white',
        progressColor: '#ff006b',
        cursorColor: '#ff006b',
        responsive: true,
        normalize: true,
        barWidth: 2
    });
    // wavesurfers[index] = thisWavesurfer;
    // thisWavesurfer.load(`./snippets/${thisSnippet.filename}`);
    // thisWavesurfer.on("finish", waveformFinished);
    wavesurfers[index].load(`./snippets/${thisSnippet.filename}`);
    wavesurfers[index].on("finish", waveformFinished);
    
}

var moveToSnippet = (index) => {
    wavesurfers[onSnippet].pause();
    waveformFinished();
    document.getElementById(`snippetNavDot-${onSnippet}`).classList.remove("currentSnippetNavDot");
    document.getElementById(`snippetNavDot-${index}`).classList.add("currentSnippetNavDot");
    onSnippet = index;
    document.getElementById("snippetHolder").style.left = `${-20*index}vw`;

}

var nextSnippet = () => {
    moveToSnippet((onSnippet+1)%numSnippets);
}
var prevSnippet = () => {
    var prevSnippet = onSnippet-1;
    if(prevSnippet < 0){
        prevSnippet = numSnippets-1;
    }
    moveToSnippet(prevSnippet);
}

var makeSnippetNavDots = () => {
    var container = document.getElementById("snippetNavDots");
    for(var i = 0; i < numSnippets; i++){
        container.innerHTML += `<div class="snippetNavDot" id="snippetNavDot-${i}" onclick="moveToSnippet(${i})"></div>`;
    }
} 


const _snippetData = fetch("./snippets/snippets.json").then(data => data.json());
window.onload = async () => {
    console.log("loaded");
    var snippetData = await _snippetData;
    console.log("fetched");
    numSnippets = snippetData.snippetCount;

    console.log(`snippet count: ${numSnippets}`);

    wavesurfers.fill(null, 0, numSnippets);

    document.getElementById("snippetHolder").style.gridAutoColumns = `repeat(20vw, ${numSnippets})`;
    document.getElementById("snippetHolder").style.width = `${100*numSnippets}%`;

    makeSnippetNavDots();
    document.getElementById("snippetNavDot-0").classList.add("currentSnippetNavDot");

    for(var s = 0; s < numSnippets; s++){
        console.log(`making snippet ${s}`);
        makeSnippet(snippetData.samples[s], s);
    }
    // makeSnippet(snippetData.samples[0], 0);
}



// old stuff for doing it with audio ctx, not really doing that anymore though
    // console.log("something");
    // setupAudio();
    // changeSource("testAud");
    // makeTestFreqGraph();
    // wavesurfer = WaveSurfer.create({
    //     container: '#waveform',
    //     waveColor: 'white',
    //     progressColor: '#ff006b',
    //     cursorColor: '#ff006b',
    //     responsive: true,
    //     normalize: true,
    //     barWidth: 2
    // });
    // wavesurfer.load(`./snippets/testsnippet.m4a`);
    // resultElem = document.getElementById("sizeDisplay");
    // // resultElem.innerHTML = "something";
    // console.log(getFrequencyData());
    // window.setInterval(()=>{
    //     var fullData = getFrequencyData();
    //     // for(var i = 0; i < 512; i++){
    //     //     var thisElem = document.getElementById(`freqBar${i}`);
    //     //     var thisSize = Math.abs(fullData[i])/16 + 0.25;
    //     //     thisElem.style.height = `${thisSize}vw`;
    //     // }
    //     // var newSize = ((fullData[0]+40)/15) + 10;
    //     var offsetAmt = Math.abs(16*(fullData[8]-128)/128);
    //     var rOffset = document.getElementById("rOffset");
    //     var bOffset = document.getElementById("bOffset");
    //     rOffset.setAttribute("dx", offsetAmt);
    //     rOffset.setAttribute("dy", offsetAmt);
    //     bOffset.setAttribute("dx", -offsetAmt);
    //     bOffset.setAttribute("dy", -offsetAmt);
    //     var avgFreq = getAvgFreq(fullData);
    //     var newSize = 2*(avgFreq-128)/128 + 10;
    //     // resultElem.style.width = `${newSize}vw`;
    //     // resultElem.style.height = `${newSize}vw`;
    //     console.log(newSize);
    //     // console.log(getFrequencyData());
    // }, 100)
    // while(true){
    //     resultElem.innerHTML = getFrequencyData()[0];
    // }
// }