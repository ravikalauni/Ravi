// Utility Functions
const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date));
};

// Static Data (since we're not using an API)
const diaryEntries = [
    {
        id: 1,
        title: "New beginnings",
        content: "joined a new group, and it’s been such a refreshing change. The vibes are different, but in a good way. Feels like the start of something exciting.",
        date: "06 November 2024"
    },
    {
        id: 2,
        title: "Learning the hard way",
        content: "Tried something I thought I’d be great at, and honestly, I failed miserably. But, hey, at least now I know what not to do next time.",
        date: "13 November 2024"
    },
    {
        id: 1,
        title: "Realising my worth",
        content: "Had a moment recently where I realised I’m not settling for less anymore. It’s time to go after what I truly deserve.",
        date: "21 November 2024"
    },
    {
        id: 2,
        title: "Learning the hard way",
        content: "Tried something I thought I’d be great at, and honestly, I failed miserably. But, hey, at least now I know what not to do next time.",
        date: "13 November 2024"
    },
    {
        id: 2,
        title: "Today, I felt unimportant",
        content: "I reached out to someone, hoping for a response, but got nothing. It stings, but I guess it’s a reminder not to rely on others for validation.",
        date: "4 Janaury 2025"
    },
    {
        id: 2,
        title: "I let go of something toxic",
        content: "I made the decision to stop giving my energy to something that drained me. It’s freeing to finally walk away, even if it’s hard.",
        date: "29 December 2024"
    },
    {
        id: 2,
        title: "They became strangers:",
        content: "Those two in college, who used to call me 'friend', suddenly stopped talking to me. It’s sad, but anyway…",
        date: "12 February 2025"
    },
    {
        id: 2,
        title: "Today, I took a step back",
        content: "I decided to put my phone down and just focus on the present. It’s crazy how much I missed just being fully in the moment.",
        date: "18 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, I felt completely seen",
        content: "Someone looked at me today and actually listened, not just heard me. It’s a small thing, but it felt so rare and meaningful.",
        date: "22 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, It was my Birthday",
        content: "Another year, another blessing. I’m just grateful for everything - good health, the people around me, and all the opportunities I’ve had. Thank you, God, for everything.",
        date: "23 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, I laughed more than I have in a while",
        content: "Spent time with people who make me laugh, and it felt good to just enjoy the moment.",
        date: "8 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, I faced a hard truth",
        content: "I had to face something I’ve been avoiding. It wasn’t easy, but it felt good to be honest with myself.",
        date: "13 November 2024"
    },

    {
        id: 2,
        title: "Today, I took a chance",
        content: "I stepped out of my comfort zone and tried something new. It was nerve-wracking, but I’m glad I did it.",
        date: "5 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, I appreciated my own company",
        content: "Spent some time alone today and realised I’m perfectly fine being by myself.",
        date: "25 Janaury 2025"
    },
    {
        id: 2,
        title: "Today, I felt tired",
        content: "It was a long day, and I could barely keep my eyes open by the end. Sometimes, the exhaustion hits harder than expected.",
        date: "1 February 2025"
    },
    {
        id: 2,
        title: "Today, I embraced change",
        content: "Something in my routine shifted today, and instead of resisting it, I decided to roll with it. Change isn’t always bad.",
        date: "4 February 2025"
    },
    {
        id: 2,
        title: "Today, I took a break",
        content: "I’ve been non-stop, but today I gave myself permission to take a step back and rest. It was much needed.",
        date: "6 February 2025"
    },
    {
        id: 2,
        title: "Today, I felt proud of myself",
        content: "I did something I didn’t think I could, and now I’m feeling accomplished. It’s nice to prove to myself that I can handle more than I give myself credit for.",
        date: "9 February 2025"
    },
    {
        id: 2,
        title: "Today, I felt frustrated",
        content: "I was trying to get something done, but everything kept going wrong. It was one of those days where nothing seemed to go right.",
        date: "10 February 2025"
    },
    {
        id: 2,
        title: "Today, I took responsibility",
        content: "I had to own up to something I’d been avoiding. It wasn’t easy, but it felt better to get it out of the way.",
        date: "11 February 2025"
    },
    {
        id: 2,
        title: "Today, I felt confident",
        content: "I had the chance to step up and do something I was nervous about, but I pulled through. It’s nice to realise I can handle more than I thought.",
        date: "12 February 2025"
    },
    {
        id: 2,
        title: "Today, I felt overwhelmed with joy",
        content: "Something simple made me so happy today. It’s amazing how little things can have such a big impact on your mood.",
        date: "14 February 2025"
    },
    {
        id: 2,
        title: "Today, I learned to let go",
        content: "I realised I was holding onto something that wasn’t serving me. Letting it go was hard, but it felt right.",
        date: "15 February 2025"
    },
    {
        id: 2,
        title: "Today, I felt overwhelmed with joy",
        content: "Something simple made me so happy today. It’s amazing how little things can have such a big impact on your mood.",
        date: "17 February 2025"
    },
   
];

// Entry Management
class DiaryEntry {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.date = data.date;
    }

    createEntryElement() {
        const entry = document.createElement('div');
        entry.className = 'timeline-entry';
        entry.innerHTML = `
            <div class="timeline-line"></div>
            <div class="timeline-dot"></div>
            <div class="entry-header">
                <div>
                    <div class="entry-date">${formatDate(this.date)}</div>
                    <h3 class="entry-title">${this.title}</h3>
                </div>
               
            </div>
            <div class="entry-content">${this.content}</div><br>
             <button class="btn btn-outline entry-menu">
                    <span class="icon">⋮</span>
                </button><br>
            <div class="entry-menu-popup hidden">
                <button onclick="showContext(${this.id})">Read the Context</button>
                <button onclick="shareEntry(${this.id})">Copy Link</button>
                <button onclick="downloadEntry(${this.id})">Download Entry (jpg)</button>
            </div>
        `;

        // Add event listeners
        const menuBtn = entry.querySelector('.entry-menu');
        const menuPopup = entry.querySelector('.entry-menu-popup');
        menuBtn.addEventListener('click', () => {
            menuPopup.classList.toggle('hidden');
        });

        return entry;
    }
}

// Download Entry as Image
async function downloadEntry(entryId) {
    const entry = diaryEntries.find(e => e.id === entryId);
    if (!entry) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 300;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#8B0000');
    gradient.addColorStop(1, '#2B0000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Content
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(entry.title, 40, 60);

    ctx.font = '16px sans-serif';
    ctx.fillText(formatDate(entry.date), 40, 100);

    // Content
    ctx.font = '18px sans-serif';
    const words = entry.content.split(' ');
    let line = '';
    let y = 140;

    words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > canvas.width - 80) {
            ctx.fillText(line, 40, y);
            line = word + ' ';
            y += 30;
        } else {
            line = testLine;
        }
    });
    ctx.fillText(line, 40, y);

    // Watermark
    ctx.font = 'italic 30px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('His Daily Diary', canvas.width - 250, canvas.height - 40);

    // Download
    const link = document.createElement('a');
    link.download = `diary-entry-${entry.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Share Functionality
function shareEntry(entryId) {
    const entry = diaryEntries.find(e => e.id === entryId);
    if (!entry) return;

    const shareUrl = `${window.location.origin}/entry/${entry.id}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
        const messageBox = document.createElement('div');
        messageBox.className = 'copy-message';
        messageBox.innerText = 'Link copied!';
        document.body.appendChild(messageBox);
        setTimeout(() => messageBox.remove(), 2000);
    });
}

// Context Panel Functionality
function showContext(entryId) {
    const entry = diaryEntries.find(e => e.id === entryId);
    if (!entry) return;

    document.getElementById('contextTitle').textContent = entry.title;
    document.getElementById('contextPanel').classList.add('open');
}

// Close Buttons for Panels
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.panel').classList.remove('open');
    });
});

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    const privacyBtn = document.getElementById('privacyBtn');
    const privacyPanel = document.getElementById('privacyPanel');
    const overlay = document.getElementById('overlay');

    privacyBtn.addEventListener('click', () => {
        privacyPanel.classList.add('open');
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', () => {
        document.querySelectorAll('.panel.open').forEach(panel => panel.classList.remove('open'));
        overlay.classList.remove('active');
    });

    const timeline = document.getElementById('timeline');
    diaryEntries.forEach(entryData => {
        const entry = new DiaryEntry(entryData);
        timeline.appendChild(entry.createEntryElement());
    });
});
