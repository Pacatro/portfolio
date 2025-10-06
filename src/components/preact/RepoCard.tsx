interface RepoCardProps {
  link: string;
  name: string;
  language?: string;
  stars: number;
  description: string;
}

export default function RepoCard({
  link,
  name,
  language,
  stars,
  description,
}: RepoCardProps) {
  return (
    <div class="w-full">
      <li class="list-none border-2 border-green-300 rounded-md p-1 my-5">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full text-snow p-4 rounded-md hover:opacity-100 opacity-90 transition-opacity duration-300"
        >
          <div class="flex justify-between items-center">
            <p class="text-sm sm:text-base font-bold text-cyan-300">
              {name}
              {language && (
                <>
                  {" | "}
                  {language}
                </>
              )}
            </p>
            <div class="flex items-center text-white gap-4 text-base sm:text-lg font-semibold">
              <p class="text-sm sm:text-base">
                <span class="text-yellow-300 font-semibold text-xl">* </span>
                {stars}
              </p>
            </div>
          </div>
          <p class="mt-2 text-sm sm:text-base text-gray-300">{description}</p>
        </a>
      </li>
    </div>
  );
}
