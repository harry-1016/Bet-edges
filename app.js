// Tab switching function
function switchTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    
    const clickedTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName.toLowerCase()) ||
        tab.getAttribute('onclick').includes(tabName)
    );
    if (clickedTab) clickedTab.classList.add('active');
}

// PRE-MATCH CALCULATOR
function calculatePrematch() {
    const teamA = document.getElementById('teamA').value || 'Team A';
    const teamB = document.getElementById('teamB').value || 'Team B';
    
    const formA = parseFloat(document.getElementById('formA').value);
    const formB = parseFloat(document.getElementById('formB').value);
    const squadA = parseFloat(document.getElementById('squadA').value);
    const squadB = parseFloat(document.getElementById('squadB').value);
    const ppA = parseFloat(document.getElementById('ppA').value);
    const ppB = parseFloat(document.getElementById('ppB').value);
    const deathA = parseFloat(document.getElementById('deathA').value);
    const deathB = parseFloat(document.getElementById('deathB').value);
    
    const oddsA = parseFloat(document.getElementById('oddsA').value);
    const oddsB = parseFloat(document.getElementById('oddsB').value);
    
    // Calculate team strength scores
    const strengthA = (formA + squadA + (ppA * 10) + ((15 - deathA) * 5)) / 4;
    const strengthB = (formB + squadB + (ppB * 10) + ((15 - deathB) * 5)) / 4;
    
    // Calculate win probabilities
    const totalStrength = strengthA + strengthB;
    const probA = (strengthA / totalStrength) * 100;
    const probB = (strengthB / totalStrength) * 100;
    
    // Calculate implied probabilities from odds
    const impliedA = (1 / oddsA) * 100;
    const impliedB = (1 / oddsB) * 100;
    
    // Calculate edges
    const edgeA = probA - impliedA;
    const edgeB = probB - impliedB;
    
    // Determine recommendation
    let recommendation = '';
    let edgeClass = 'edge-neutral';
    let betTeam = '';
    let betEdge = 0;
    
    if (edgeA > 3) {
        recommendation = `✅ BET ON ${teamA.toUpperCase()}`;
        edgeClass = 'edge-positive';
        betTeam = teamA;
        betEdge = edgeA;
    } else if (edgeB > 3) {
        recommendation = `✅ BET ON ${teamB.toUpperCase()}`;
        edgeClass = 'edge-positive';
        betTeam = teamB;
        betEdge = edgeB;
    } else if (Math.max(edgeA, edgeB) > 0) {
        recommendation = '⚠️ SMALL EDGE - PROCEED WITH CAUTION';
        edgeClass = 'edge-neutral';
        betTeam = edgeA > edgeB ? teamA : teamB;
        betEdge = Math.max(edgeA, edgeB);
    } else {
        recommendation = '❌ NO VALUE - AVOID BETTING';
        edgeClass = 'edge-negative';
    }
    
    const resultHTML = `
        <div class="result-box">
            <h3>BETTING RECOMMENDATION</h3>
            <div class="edge-indicator ${edgeClass}">${recommendation}</div>
            
            <div class="result-grid">
                <div class="result-item">
                    <label>${teamA}</label>
                    <div class="value">${probA.toFixed(1)}%</div>
                    <div style="font-size: 0.9rem; margin-top: 5px;">
                        Edge: ${edgeA > 0 ? '+' : ''}${edgeA.toFixed(1)}%
                    </div>
                </div>
                <div class="result-item">
                    <label>${teamB}</label>
                    <div class="value">${probB.toFixed(1)}%</div>
                    <div style="font-size: 0.9rem; margin-top: 5px;">
                        Edge: ${edgeB > 0 ? '+' : ''}${edgeB.toFixed(1)}%
                    </div>
                </div>
                <div class="result-item">
                    <label>Implied Prob (${teamA})</label>
                    <div class="value">${impliedA.toFixed(1)}%</div>
                </div>
                <div class="result-item">
                    <label>Implied Prob (${teamB})</label>
                    <div class="value">${impliedB.toFixed(1)}%</div>
                </div>
            </div>
            
            ${betEdge > 0 ? `
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <strong>💡 Betting Tip:</strong><br>
                    Your edge on ${betTeam} is ${betEdge.toFixed(1)}%. 
                    ${betEdge > 5 ? 'This is a strong edge!' : 'Consider smaller stakes.'}
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('prematchResult').innerHTML = resultHTML;
}

// LIVE CALCULATOR
function calculateLive() {
    const chasingTeam = document.getElementById('battingTeam').value || 'Chasing Team';
    const defendingTeam = document.getElementById('defendingTeam').value || 'Defending Team';
    const target = parseFloat(document.getElementById('target').value);
    const currentScore = parseFloat(document.getElementById('currentScore').value);
    const wickets = parseFloat(document.getElementById('wickets').value);
    const overs = parseFloat(document.getElementById('overs').value);
    const liveOdds = parseFloat(document.getElementById('liveOdds').value);
    const inningsType = document.getElementById('inningsType').value;
    
    const batsmenQuality = parseFloat(document.getElementById('batsmenQuality').value);
    const bowlersQuality = parseFloat(document.getElementById('bowlersQuality').value);
    
    // Calculate required metrics
    const runsNeeded = target - currentScore;
    const oversRemaining = 20 - overs;
    const wicketsRemaining = 10 - wickets;
    const requiredRunRate = oversRemaining > 0 ? runsNeeded / oversRemaining : 0;
    const currentRunRate = overs > 0 ? currentScore / overs : 0;
    
    // Base win probability calculation (for chasing team)
    let chasingWinProb = 50;
    
    // Adjust for runs needed vs balls remaining
    const ballsRemaining = oversRemaining * 6;
    
    if (runsNeeded <= 0) {
        chasingWinProb = 95;
    } else if (wicketsRemaining === 0) {
        chasingWinProb = 5;
    } else {
        // Calculate based on required run rate
        if (requiredRunRate <= 6) chasingWinProb = 80;
        else if (requiredRunRate <= 8) chasingWinProb = 65;
        else if (requiredRunRate <= 10) chasingWinProb = 50;
        else if (requiredRunRate <= 12) chasingWinProb = 35;
        else if (requiredRunRate <= 14) chasingWinProb = 20;
        else chasingWinProb = 10;
        
        // Adjust for wickets
        const wicketsFactor = (wicketsRemaining - 5) * 5;
        chasingWinProb += wicketsFactor;
        
        // Adjust for quality
        chasingWinProb += batsmenQuality;
        chasingWinProb -= bowlersQuality;
        
        // Momentum adjustment
        if (currentRunRate > requiredRunRate) {
            chasingWinProb += 10;
        } else if (currentRunRate < requiredRunRate - 2) {
            chasingWinProb -= 10;
        }
    }
    
    chasingWinProb = Math.max(5, Math.min(95, chasingWinProb));
    const defendingWinProb = 100 - chasingWinProb;
    
    const impliedProb = (1 / liveOdds) * 100;
    const edge = chasingWinProb - impliedProb;
    
    let recommendation = '';
    let edgeClass = 'edge-neutral';
    let betTeam = '';
    
    if (edge > 5) {
        recommendation = `✅ STRONG VALUE - BET ON ${chasingTeam.toUpperCase()}`;
        edgeClass = 'edge-positive';
        betTeam = chasingTeam;
    } else if (edge > 2) {
        recommendation = `⚠️ SLIGHT EDGE - ${chasingTeam.toUpperCase()}`;
        edgeClass = 'edge-neutral';
        betTeam = chasingTeam;
    } else if (edge < -5) {
        recommendation = `✅ STRONG VALUE - BET ON ${defendingTeam.toUpperCase()}`;
        edgeClass = 'edge-positive';
        betTeam = defendingTeam;
    } else if (edge < -2) {
        recommendation = `⚠️ SLIGHT EDGE - ${defendingTeam.toUpperCase()}`;
        edgeClass = 'edge-neutral';
        betTeam = defendingTeam;
    } else {
        recommendation = '❌ NO CLEAR VALUE';
        edgeClass = 'edge-negative';
    }
    
    const resultHTML = `
        <div class="result-box">
            <h3>MATCH WIN PROBABILITIES</h3>
            
            <div class="result-grid">
                <div class="result-item" style="background: ${chasingWinProb > 50 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <label>🏏 ${chasingTeam} (Chasing)</label>
                    <div class="value">${chasingWinProb.toFixed(1)}%</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        ${chasingWinProb > 50 ? 'Favorites to win' : 'Underdogs'}
                    </div>
                </div>
                <div class="result-item" style="background: ${defendingWinProb > 50 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <label>🛡️ ${defendingTeam} (Defending)</label>
                    <div class="value">${defendingWinProb.toFixed(1)}%</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        ${defendingWinProb > 50 ? 'Favorites to win' : 'Underdogs'}
                    </div>
                </div>
            </div>
            
            <div class="edge-indicator ${edgeClass}" style="margin-top: 15px;">${recommendation}</div>
            
            <div class="result-grid" style="margin-top: 20px;">
                <div class="result-item">
                    <label>Runs Needed</label>
                    <div class="value">${runsNeeded}</div>
                </div>
                <div class="result-item">
                    <label>Balls Remaining</label>
                    <div class="value">${(ballsRemaining)}</div>
                </div>
                <div class="result-item">
                    <label>Required RR</label>
                    <div class="value">${requiredRunRate.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <label>Current RR</label>
                    <div class="value">${currentRunRate.toFixed(2)}</div>
                </div>
                <div class="result-item">
                    <label>Wickets Left</label>
                    <div class="value">${wicketsRemaining}</div>
                </div>
                <div class="result-item">
                    <label>Betting Edge</label>
                    <div class="value" style="color: ${edge > 0 ? '#10b981' : '#ef4444'}">${edge > 0 ? '+' : ''}${edge.toFixed(1)}%</div>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; text-align: left;">
                <strong>📊 Betting Analysis:</strong><br>
                Bookmaker's ${chasingTeam} win probability (from odds): ${impliedProb.toFixed(1)}%<br>
                Model's ${chasingTeam} win probability: ${chasingWinProb.toFixed(1)}%<br>
                Edge: ${edge > 0 ? '+' : ''}${edge.toFixed(1)}% ${edge > 0 ? `(${chasingTeam} undervalued)` : edge < 0 ? `(${defendingTeam} undervalued)` : '(no edge)'}<br><br>
                ${Math.abs(edge) > 5 ? '💰 <strong>Strong betting opportunity detected!</strong>' : Math.abs(edge) > 2 ? '⚠️ Moderate edge - consider smaller stakes' : '🚫 No significant edge - avoid betting'}
            </div>
        </div>
    `;
    
    document.getElementById('liveResult').innerHTML = resultHTML;
}

// OVER/UNDER CALCULATOR
function calculateOverUnder() {
    const teamA = document.getElementById('ouTeamA').value || 'Team A';
    const teamB = document.getElementById('ouTeamB').value || 'Team B';
    const totalLine = parseFloat(document.getElementById('totalLine').value);
    const avgScore = parseFloat(document.getElementById('avgScoreOU').value);
    const ppSR = parseFloat(document.getElementById('ppSR').value);
    const runsConc = parseFloat(document.getElementById('runsConc').value);
    const economy = parseFloat(document.getElementById('economy').value);
    const overOdds = parseFloat(document.getElementById('overOdds').value);
    const underOdds = parseFloat(document.getElementById('underOdds').value);
    const innings = document.getElementById('innings').value;
    
    // Calculate projected score based on batting and bowling strength
    const battingStrength = (avgScore * 0.6) + ((ppSR / 130) * 85 * 0.4);
    const bowlingImpact = (runsConc * 0.5) + (economy * 20 * 0.5);
    const projectedScore = (battingStrength * 0.6) + (bowlingImpact * 0.4);
    
    // Calculate difference from line
    const difference = projectedScore - totalLine;
    
    // More nuanced probability calculation
    let overProb = 50;
    
    if (difference >= 15) overProb = 75;
    else if (difference >= 10) overProb = 68;
    else if (difference >= 7) overProb = 62;
    else if (difference >= 4) overProb = 57;
    else if (difference >= 2) overProb = 53;
    else if (difference >= 0) overProb = 50;
    else if (difference >= -2) overProb = 47;
    else if (difference >= -4) overProb = 43;
    else if (difference >= -7) overProb = 38;
    else if (difference >= -10) overProb = 32;
    else if (difference >= -15) overProb = 25;
    else overProb = 20;
    
    const underProb = 100 - overProb;
    
    const impliedOver = (1 / overOdds) * 100;
    const impliedUnder = (1 / underOdds) * 100;
    
    const edgeOver = overProb - impliedOver;
    const edgeUnder = underProb - impliedUnder;
    
    let recommendation = '';
    let edgeClass = 'edge-neutral';
    let betSuggestion = '';
    
    if (edgeOver > 5) {
        recommendation = '✅ STRONG VALUE - BET ON OVER';
        edgeClass = 'edge-positive';
        betSuggestion = `Over ${totalLine}`;
    } else if (edgeUnder > 5) {
        recommendation = '✅ STRONG VALUE - BET ON UNDER';
        edgeClass = 'edge-positive';
        betSuggestion = `Under ${totalLine}`;
    } else if (edgeOver > 2) {
        recommendation = `⚠️ SLIGHT EDGE - OVER ${totalLine}`;
        edgeClass = 'edge-neutral';
        betSuggestion = `Over ${totalLine}`;
    } else if (edgeUnder > 2) {
        recommendation = `⚠️ SLIGHT EDGE - UNDER ${totalLine}`;
        edgeClass = 'edge-neutral';
        betSuggestion = `Under ${totalLine}`;
    } else {
        recommendation = '❌ NO VALUE - AVOID';
        edgeClass = 'edge-negative';
        betSuggestion = 'No bet recommended';
    }
    
    const resultHTML = `
        <div class="result-box">
            <h3>OVER/UNDER ANALYSIS</h3>
            <div class="edge-indicator ${edgeClass}">${recommendation}</div>
            
            <div class="result-grid">
                <div class="result-item" style="background: ${overProb > 50 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <label>📈 Over ${totalLine}</label>
                    <div class="value">${overProb.toFixed(1)}%</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        Edge: ${edgeOver > 0 ? '+' : ''}${edgeOver.toFixed(1)}%
                    </div>
                </div>
                <div class="result-item" style="background: ${underProb > 50 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <label>📉 Under ${totalLine}</label>
                    <div class="value">${underProb.toFixed(1)}%</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        Edge: ${edgeUnder > 0 ? '+' : ''}${edgeUnder.toFixed(1)}%
                    </div>
                </div>
                <div class="result-item">
                    <label>Projected Score</label>
                    <div class="value">${projectedScore.toFixed(0)}</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        ${difference > 0 ? '+' : ''}${difference.toFixed(1)} vs line
                    </div>
                </div>
                <div class="result-item">
                    <label>Line</label>
                    <div class="value">${totalLine}</div>
                    <div style="font-size: 0.85rem; margin-top: 5px;">
                        ${innings} innings
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; text-align: left;">
                <strong>📊 Detailed Analysis:</strong><br>
                Batting team avg: ${avgScore} runs<br>
                Bowling team concedes: ${runsConc} runs avg<br>
                Projected score: ${projectedScore.toFixed(1)} runs<br>
                Difference from line: ${difference > 0 ? '+' : ''}${difference.toFixed(1)} runs<br><br>
                <strong>Implied Probabilities:</strong><br>
                Over (from odds): ${impliedOver.toFixed(1)}%<br>
                Under (from odds): ${impliedUnder.toFixed(1)}%<br><br>
                ${Math.abs(Math.max(edgeOver, edgeUnder)) > 5 ? '💰 <strong>Strong edge detected!</strong>' : 
                  Math.abs(Math.max(edgeOver, edgeUnder)) > 2 ? '⚠️ Moderate edge - consider bet' : 
                  '🚫 No significant edge'}
            </div>
        </div>
    `;
    
    document.getElementById('overunderResult').innerHTML = resultHTML;
}

// BET LOG FUNCTIONALITY
let betLog = JSON.parse(localStorage.getItem('betLog')) || [];

function addBet() {
    const date = document.getElementById('betDate').value;
    const league = document.getElementById('betLeague').value;
    const match = document.getElementById('betMatch').value;
    const betType = document.getElementById('betType').value;
    const selection = document.getElementById('betSelection').value;
    const winProb = document.getElementById('betWinProb').value;
    const odds = parseFloat(document.getElementById('betOdds').value);
    const stake = parseFloat(document.getElementById('betStake').value);
    const result = document.getElementById('betResult').value;
    
    if (!date || !match || !selection || !odds || !stake) {
        alert('Please fill in all required fields');
        return;
    }
    
    let pl = 0;
    if (result === 'won') {
        pl = stake * (odds - 1);
    } else if (result === 'lost') {
        pl = -stake;
    }
    
    const bet = {
        id: Date.now(),
        date,
        league,
        match,
        betType,
        selection,
        winProb,
        odds,
        stake,
        result,
        pl
    };
    
    betLog.push(bet);
    localStorage.setItem('betLog', JSON.stringify(betLog));
    
    // Clear form
    document.getElementById('betMatch').value = '';
    document.getElementById('betSelection').value = '';
    document.getElementById('betWinProb').value = '';
    document.getElementById('betOdds').value = '';
    document.getElementById('betStake').value = '';
    document.getElementById('betResult').value = '';
    
    updateBetLog();
}

function updateBetLog() {
    const tbody = document.getElementById('betLogBody');
    
    if (betLog.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 30px; color: #6b7280;">
                    No bets logged yet. Add your first bet above!
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = betLog.map(bet => `
            <tr>
                <td>${bet.date}</td>
                <td>${bet.match}</td>
                <td>${bet.selection}</td>
                <td>${bet.odds.toFixed(2)}</td>
                <td>$${bet.stake.toFixed(2)}</td>
                <td>${bet.result || 'Pending'}</td>
                <td class="${bet.pl > 0 ? 'profit' : bet.pl < 0 ? 'loss' : ''}">
                    ${bet.pl > 0 ? '+' : ''}$${bet.pl.toFixed(2)}
                </td>
            </tr>
        `).reverse().join('');
    }
    
    updateStats();
}

function updateStats() {
    const settledBets = betLog.filter(b => b.result === 'won' || b.result === 'lost');
    const wonBets = betLog.filter(b => b.result === 'won').length;
    const totalBets = settledBets.length;
    const winRate = totalBets > 0 ? (wonBets / totalBets * 100) : 0;
    const totalPL = betLog.reduce((sum, bet) => sum + bet.pl, 0);
    const totalStaked = settledBets.reduce((sum, bet) => sum + bet.stake, 0);
    const roi = totalStaked > 0 ? (totalPL / totalStaked * 100) : 0;
    
    document.getElementById('totalBets').textContent = totalBets;
    document.getElementById('winRate').textContent = winRate.toFixed(1) + '%';
    document.getElementById('totalPL').textContent = (totalPL >= 0 ? '+' : '') + '$' + totalPL.toFixed(2);
    document.getElementById('totalPL').style.color = totalPL >= 0 ? '#10b981' : '#ef4444';
    document.getElementById('roi').textContent = (roi >= 0 ? '+' : '') + roi.toFixed(1) + '%';
    document.getElementById('roi').style.color = roi >= 0 ? '#10b981' : '#ef4444';
}

// Initialize bet log on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBetLog();
});

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').classList.add('show');
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
        document.getElementById('installPrompt').classList.remove('show');
    }
});
