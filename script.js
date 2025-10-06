<script>
window.MathJax = { tex:{ inlineMath:[['$','$']], processEscapes:true, processEnvironments:true }, startup:{ ready: function(){MathJax.startup.defaultReady();}}};

let latexCode = '$\\begin{aligned}\n\n\\end{aligned}$';

function processInput(input){
    let lines=input.split('\n');
    let processedLines=[];
    for(let line of lines){
        if(line.trim()===''){ processedLines.push(''); continue; }
        let processed=line;

        // Transformations mathématiques
        processed = processed.replace(/(\d+|\w+|\([^)]+\)|\{[^}]+\})\s*\/\s*(\d+|\w+|\([^)]+\)|\{[^}]+\})/g,'\\cfrac{$1}{$2}');
        processed = processed.replace(/\*/g,' \\times ');
        processed = processed.replace(/!=/g,' \\neq ');
        processed = processed.replace(/<=/g,' \\leqslant ');
        processed = processed.replace(/>=/g,' \\geqslant ');
        processed = processed.replace(/::/g,' \\div ');
        processed = processed.replace(/%/g,'\\%');
        processed = processed.replace(/\\bm/g,'\\begin{matrix}');

        // Regrouper mots alphabétiques consécutifs
        processed = processed.replace(/\b([a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})*)\b/g,function(match){
            const latexCommands = ['cfrac','times','neq','leqslant','geqslant','div','matrix','begin','end','text','sqrt','sum','int','lim','sin','cos','tan','log','ln','exp'];
            if(latexCommands.includes(match)) return match;
            return ' \\text{ '+match+' } ';
        });

        if(processed.trim()!=='') processed='& '+processed+' \\\\';
        processedLines.push(processed);
    }

    for(let i=processedLines.length-1;i>=0;i--){
        if(processedLines[i].trim()!==''){
            processedLines[i]=processedLines[i].replace(/ \\\\$/,'');
            break;
        }
    }

    return processedLines.join('\n');
}

function highlightLatex(code){
    return code.replace(/(\\[a-zA-Z]+)/g,'<span class="latex-command">$1</span>')
               .replace(/(\[|\])/g,'<span class="latex-bracket">$1</span>')
               .replace(/(\{|\})/g,'<span class="latex-brace">$1</span>')
               .replace(/(\\text\{[^}]*\})/g,'<span class="latex-text">$1</span>')
               .replace(/(\\times|\\neq|\\leqslant|\\geqslant|\\div|&|\\\\)/g,'<span class="latex-symbol">$1</span>');
}

function updateOutput(){
    const input = document.getElementById('input').value;
    let processed = processInput(input);
    if(processed.trim()===''){
        latexCode = '$\\begin{aligned}\n\n\\end{aligned}$';
    } else {
        latexCode = '$\\begin{aligned}\n'+processed+'\n\\end{aligned}$';
    }
    document.getElementById('latexOutput').innerHTML = highlightLatex(latexCode);
}

function copyToClipboard(text){
    navigator.clipboard.writeText(text).then(showCopyFeedback).catch(err=>console.error(err));
}
function copyInput(){copyToClipboard(document.getElementById('input').value);}
function copyLatex(){copyToClipboard(latexCode);}
function showCopyFeedback(){const f=document.getElementById('copyFeedback'); f.classList.add('show'); setTimeout(()=>f.classList.remove('show'),2000);}

document.getElementById('input').addEventListener('input',updateOutput);

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('input').value=''; // vide par défaut
    updateOutput(); // LaTeX sur plusieurs lignes dès le départ
});
</script>

