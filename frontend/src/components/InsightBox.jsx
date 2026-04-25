export default function InsightBox({ text }) {
    return (
        <div className="bg-success-dark/40 border border-success-border/30 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-xl shrink-0">💡</span>
            <p className="text-success-text text-sm leading-relaxed">{text}</p>
        </div>
    );
}